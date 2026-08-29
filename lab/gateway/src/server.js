import http from "node:http";
import { randomUUID } from "node:crypto";
import { WebSocketServer } from "ws";
import Docker from "dockerode";

const PORT = Number(process.env.LAB_GATEWAY_PORT || 4091);
const IMAGE = process.env.LAB_SANDBOX_IMAGE || "etienne-lab-sandbox:local";
const IDLE_MS = Number(process.env.LAB_IDLE_MS || 5 * 60 * 1000);
const MAX_MS = Number(process.env.LAB_MAX_MS || 10 * 60 * 1000);
const MAX_SESSIONS = Number(process.env.LAB_MAX_SESSIONS || 5);
const ALLOWED_ORIGINS = (
  process.env.LAB_ALLOWED_ORIGINS ||
  "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3460"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const docker = new Docker({
  socketPath: process.env.DOCKER_SOCKET || "/var/run/docker.sock",
});

/** @type {Map<string, Session>} */
const sessions = new Map();

/**
 * @typedef {object} Session
 * @property {string} id
 * @property {import('dockerode').Container} container
 * @property {import('ws').WebSocket} ws
 * @property {NodeJS.Timeout} idleTimer
 * @property {NodeJS.Timeout} maxTimer
 * @property {() => void} resetIdle
 * @property {NodeJS.ReadWriteStream | null} stream
 */

function log(event, fields = {}) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), event, ...fields }));
}

function originAllowed(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
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
  log("session_ended", { id, reason, active: sessions.size });
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
    if (session.ws.readyState === session.ws.OPEN) {
      session.ws.send(chunk.toString("utf8"));
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

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ ok: true, sessions: sessions.size, max: MAX_SESSIONS })
    );
    return;
  }
  res.writeHead(404);
  res.end("not found");
});

const wss = new WebSocketServer({ server, path: "/lab" });

wss.on("connection", async (ws, req) => {
  const origin = req.headers.origin || "";
  if (!originAllowed(origin)) {
    log("reject_origin", { origin });
    ws.close(1008, "origin not allowed");
    return;
  }

  if (sessions.size >= MAX_SESSIONS) {
    log("reject_capacity", { active: sessions.size });
    ws.send(
      "Lab capacity reached. Try again later, or use the simulated portfolio CLI.\r\n"
    );
    ws.close(1013, "capacity");
    return;
  }

  const id = randomUUID();
  /** @type {Session | undefined} */
  let session;

  try {
    ws.send("Starting Engineering Lab sandbox...\r\n");
    const container = await createSandbox(id);
    session = {
      id,
      container,
      ws,
      idleTimer: setTimeout(() => {}, 0),
      maxTimer: setTimeout(() => {}, 0),
      resetIdle: () => {},
      stream: null,
    };
    sessions.set(id, session);
    scheduleTimers(session);
    await attachShell(session);
    log("session_started", { id, active: sessions.size });
    ws.send(`[lab] ready — session ${id.slice(0, 8)}\r\n`);
  } catch (err) {
    log("session_failed", { id, error: String(err) });
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
    origins: ALLOWED_ORIGINS,
  });
});

async function shutdown() {
  log("gateway_shutdown");
  const ids = [...sessions.keys()];
  await Promise.all(ids.map((id) => destroySession(id, "shutdown")));
  server.close();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());
