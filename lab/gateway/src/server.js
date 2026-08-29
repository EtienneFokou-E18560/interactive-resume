import http from "node:http";
import { createHash, randomUUID } from "node:crypto";
import { WebSocketServer } from "ws";
import Docker from "dockerode";

const PORT = Number(process.env.LAB_GATEWAY_PORT || 4091);
const IMAGE = process.env.LAB_SANDBOX_IMAGE || "etienne-lab-sandbox:local";
const IDLE_MS = Number(process.env.LAB_IDLE_MS || 5 * 60 * 1000);
const MAX_MS = Number(process.env.LAB_MAX_MS || 10 * 60 * 1000);
const MAX_SESSIONS = Number(process.env.LAB_MAX_SESSIONS || 5);
const MAX_SESSIONS_PER_IP = Number(process.env.LAB_MAX_SESSIONS_PER_IP || 2);
const CREATE_RATE = Number(process.env.LAB_CREATE_RATE || 3);
const CREATE_WINDOW_MS = Number(process.env.LAB_CREATE_WINDOW_MS || 60_000);
const MAX_OUTPUT_BYTES = Number(process.env.LAB_MAX_OUTPUT_BYTES || 1_048_576);
const ADMIN_TOKEN = process.env.LAB_ADMIN_TOKEN || "";
const REQUIRE_ADMIN =
  process.env.LAB_REQUIRE_ADMIN === "1" ||
  process.env.LAB_REQUIRE_ADMIN === "true";
const ALLOWED_ORIGINS = (
  process.env.LAB_ALLOWED_ORIGINS ||
  "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3460"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (REQUIRE_ADMIN && !ADMIN_TOKEN) {
  console.error(
    JSON.stringify({
      ts: new Date().toISOString(),
      event: "gateway_boot_failed",
      error: "LAB_REQUIRE_ADMIN=1 but LAB_ADMIN_TOKEN is empty",
    })
  );
  process.exit(1);
}

const docker = new Docker({
  socketPath: process.env.DOCKER_SOCKET || "/var/run/docker.sock",
});

/** @type {Map<string, Session>} */
const sessions = new Map();

/** @type {Map<string, number[]>} */
const createTimestampsByIp = new Map();

let labsDisabled =
  process.env.LAB_DISABLED === "1" || process.env.LAB_DISABLED === "true";

/**
 * @typedef {object} Session
 * @property {string} id
 * @property {string} clientIp
 * @property {import('dockerode').Container} container
 * @property {import('ws').WebSocket} ws
 * @property {NodeJS.Timeout} idleTimer
 * @property {NodeJS.Timeout} maxTimer
 * @property {() => void} resetIdle
 * @property {NodeJS.ReadWriteStream | null} stream
 * @property {number} outputBytes
 */

function log(event, fields = {}) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), event, ...fields }));
}

function hashIp(ip) {
  return createHash("sha256").update(ip || "unknown").digest("hex").slice(0, 12);
}

function clientIpFromRequest(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    return xff.split(",")[0].trim();
  }
  if (Array.isArray(xff) && xff[0]) {
    return String(xff[0]).split(",")[0].trim();
  }
  const addr = req.socket?.remoteAddress || "";
  return addr.replace(/^::ffff:/, "") || "unknown";
}

function originAllowed(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

/** Strip OSC/DCS/APC/PM sequences; keep normal CSI (clear, colors). */
function sanitizeTerminalOutput(text) {
  return text
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)?/g, "")
    .replace(/\x1b[P_^][^\x1b]*(?:\x1b\\)?/g, "");
}

function sessionsForIp(ip) {
  let n = 0;
  for (const s of sessions.values()) {
    if (s.clientIp === ip) n += 1;
  }
  return n;
}

function recordCreate(ip) {
  const now = Date.now();
  const prev = createTimestampsByIp.get(ip) || [];
  const next = prev.filter((t) => now - t < CREATE_WINDOW_MS);
  next.push(now);
  createTimestampsByIp.set(ip, next);
  return next.length;
}

function createCountInWindow(ip) {
  const now = Date.now();
  const prev = createTimestampsByIp.get(ip) || [];
  const next = prev.filter((t) => now - t < CREATE_WINDOW_MS);
  createTimestampsByIp.set(ip, next);
  return next.length;
}

function adminAuthorized(req) {
  if (!ADMIN_TOKEN) return false;
  const header = req.headers.authorization || "";
  return header === `Bearer ${ADMIN_TOKEN}`;
}

async function destroySession(id, reason) {
  const session = sessions.get(id);
  if (!session) return;
  sessions.delete(id);
  clearTimeout(session.idleTimer);
  clearTimeout(session.maxTimer);
  try {
    session.stream?.destroy?.();
  } catch {
    /* ignore */
  }
  try {
    if (session.ws.readyState === session.ws.OPEN) {
      session.ws.send(`\r\n[lab] session ended (${reason})\r\n`);
      session.ws.close();
    }
  } catch {
    /* ignore */
  }
  try {
    await session.container.kill().catch(() => {});
    await session.container.remove({ force: true }).catch(() => {});
  } catch {
    /* ignore */
  }
  log("session_ended", {
    id,
    reason,
    active: sessions.size,
    ipHash: hashIp(session.clientIp),
  });
}

async function destroyAllSessions(reason) {
  const ids = [...sessions.keys()];
  await Promise.all(ids.map((id) => destroySession(id, reason)));
}

async function createSandbox(id) {
  const container = await docker.createContainer({
    Image: IMAGE,
    name: `etienne-lab-${id.slice(0, 8)}`,
    Cmd: ["infinity"],
    Entrypoint: ["sleep"],
    Tty: false,
    NetworkDisabled: true,
    HostConfig: {
      AutoRemove: true,
      ReadonlyRootfs: true,
      Tmpfs: {
        "/home/visitor": "rw,nosuid,nodev,noexec,size=32m,uid=10001,gid=10001",
        "/tmp": "rw,nosuid,nodev,noexec,size=16m,uid=10001,gid=10001",
      },
      Memory: 256 * 1024 * 1024,
      NanoCpus: 500_000_000,
      PidsLimit: 32,
      CapDrop: ["ALL"],
      SecurityOpt: ["no-new-privileges:true"],
    },
    User: "visitor",
    Env: ["HOME=/home/visitor"],
  });
  await container.start();
  return container;
}

async function attachShell(session) {
  const exec = await session.container.exec({
    Cmd: ["/usr/local/bin/lab-shell"],
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    User: "visitor",
  });

  const stream = await exec.start({
    hijack: true,
    stdin: true,
    Tty: true,
  });
  session.stream = stream;

  stream.on("data", (chunk) => {
    session.resetIdle();
    const raw = chunk.toString("utf8");
    const text = sanitizeTerminalOutput(raw);
    session.outputBytes += Buffer.byteLength(text, "utf8");
    if (session.outputBytes > MAX_OUTPUT_BYTES) {
      log("security_output_limit", {
        id: session.id,
        bytes: session.outputBytes,
        max: MAX_OUTPUT_BYTES,
        ipHash: hashIp(session.clientIp),
      });
      void destroySession(session.id, "output_limit");
      return;
    }
    if (session.ws.readyState === session.ws.OPEN && text) {
      session.ws.send(text);
    }
  });
  stream.on("end", () => {
    void destroySession(session.id, "stream_end");
  });
  stream.on("error", () => {
    void destroySession(session.id, "stream_error");
  });
}

function scheduleTimers(session) {
  const resetIdle = () => {
    clearTimeout(session.idleTimer);
    session.idleTimer = setTimeout(() => {
      void destroySession(session.id, "idle_timeout");
    }, IDLE_MS);
  };
  session.resetIdle = resetIdle;
  resetIdle();
  session.maxTimer = setTimeout(() => {
    void destroySession(session.id, "max_lifetime");
  }, MAX_MS);
}

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", () => resolve(""));
  });
}

const server = http.createServer(async (req, res) => {
  const url = req.url?.split("?")[0] || "";

  if (req.method === "GET" && url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        ok: true,
        disabled: labsDisabled,
        sessions: sessions.size,
        max: MAX_SESSIONS,
        maxPerIp: MAX_SESSIONS_PER_IP,
      })
    );
    return;
  }

  if (req.method === "POST" && (url === "/admin/kill" || url === "/admin/enable")) {
    await readBody(req);
    if (!adminAuthorized(req)) {
      log("admin_unauthorized", { path: url });
      res.writeHead(401, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: "unauthorized" }));
      return;
    }
    if (url === "/admin/kill") {
      labsDisabled = true;
      await destroyAllSessions("kill_switch");
      log("kill_switch", { disabled: true, active: sessions.size });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true, disabled: true, sessions: 0 }));
      return;
    }
    labsDisabled = false;
    log("labs_enabled", { disabled: false });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, disabled: false }));
    return;
  }

  res.writeHead(404);
  res.end("not found");
});

const wss = new WebSocketServer({ server, path: "/lab" });

wss.on("connection", async (ws, req) => {
  const origin = req.headers.origin || "";
  const clientIp = clientIpFromRequest(req);
  const ipHash = hashIp(clientIp);

  if (!originAllowed(origin)) {
    log("reject_origin", { origin, ipHash });
    ws.close(1008, "origin not allowed");
    return;
  }

  if (labsDisabled) {
    log("reject_disabled", { ipHash });
    ws.send(
      "Engineering Lab is temporarily disabled. Use the simulated portfolio CLI.\r\n"
    );
    ws.close(1013, "disabled");
    return;
  }

  if (sessions.size >= MAX_SESSIONS) {
    log("reject_capacity", { active: sessions.size, ipHash });
    ws.send(
      "Lab capacity reached. Try again later, or use the simulated portfolio CLI.\r\n"
    );
    ws.close(1013, "capacity");
    return;
  }

  if (sessionsForIp(clientIp) >= MAX_SESSIONS_PER_IP) {
    log("reject_ip_capacity", {
      activeForIp: sessionsForIp(clientIp),
      maxPerIp: MAX_SESSIONS_PER_IP,
      ipHash,
    });
    ws.send(
      "Per-client lab limit reached. End an existing session or use the simulated CLI.\r\n"
    );
    ws.close(1013, "ip_capacity");
    return;
  }

  if (createCountInWindow(clientIp) >= CREATE_RATE) {
    log("reject_rate", { ipHash, rate: CREATE_RATE, windowMs: CREATE_WINDOW_MS });
    ws.send(
      "Lab launch rate limit exceeded. Wait a moment, or use the simulated portfolio CLI.\r\n"
    );
    ws.close(1013, "rate_limited");
    return;
  }

  recordCreate(clientIp);

  const id = randomUUID();
  /** @type {Session | undefined} */
  let session;

  try {
    ws.send("Starting Engineering Lab sandbox...\r\n");
    const container = await createSandbox(id);
    session = {
      id,
      clientIp,
      container,
      ws,
      idleTimer: setTimeout(() => {}, 0),
      maxTimer: setTimeout(() => {}, 0),
      resetIdle: () => {},
      stream: null,
      outputBytes: 0,
    };
    sessions.set(id, session);
    scheduleTimers(session);
    await attachShell(session);
    log("session_started", { id, active: sessions.size, ipHash });
    ws.send(`[lab] ready — session ${id.slice(0, 8)}\r\n`);
  } catch (err) {
    log("session_failed", { id, error: String(err), ipHash });
    ws.send(
      "Failed to start sandbox. Is Docker running and the image built?\r\n"
    );
    ws.close(1011, "start_failed");
    if (session) await destroySession(id, "start_failed");
    return;
  }

  ws.on("message", (data) => {
    session?.resetIdle();
    const text = Buffer.isBuffer(data) ? data.toString("utf8") : String(data);
    try {
      session?.stream?.write(text);
    } catch {
      void destroySession(id, "write_failed");
    }
  });

  ws.on("close", () => {
    void destroySession(id, "client_close");
  });

  ws.on("error", () => {
    void destroySession(id, "client_error");
  });
});

server.listen(PORT, () => {
  log("gateway_listen", {
    port: PORT,
    image: IMAGE,
    idleMs: IDLE_MS,
    maxMs: MAX_MS,
    maxSessions: MAX_SESSIONS,
    maxSessionsPerIp: MAX_SESSIONS_PER_IP,
    createRate: CREATE_RATE,
    createWindowMs: CREATE_WINDOW_MS,
    maxOutputBytes: MAX_OUTPUT_BYTES,
    disabled: labsDisabled,
    adminConfigured: Boolean(ADMIN_TOKEN),
    requireAdmin: REQUIRE_ADMIN,
    origins: ALLOWED_ORIGINS,
  });
});

async function shutdown() {
  log("gateway_shutdown");
  await destroyAllSessions("shutdown");
  server.close();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());
