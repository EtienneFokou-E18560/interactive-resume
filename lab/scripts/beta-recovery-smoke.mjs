#!/usr/bin/env node
/**
 * Phase 4 private-beta recovery / capacity smoke.
 * Spawns a dedicated gateway on LAB_ADVERSARIAL_PORT (default 4093).
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout as sleep } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const WebSocket = require("../gateway/node_modules/ws");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const GATEWAY_DIR = path.join(ROOT, "lab/gateway");
const PORT = Number(process.env.LAB_ADVERSARIAL_PORT || 4093);
const ORIGIN = process.env.LAB_ADVERSARIAL_ORIGIN || "http://localhost:3460";
const ADMIN = "beta-admin-token";
const WS_URL = `ws://127.0.0.1:${PORT}/lab`;
const HTTP = `http://127.0.0.1:${PORT}`;
const MAX_SESSIONS = 2;

let failures = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error(`FAIL: ${msg}`);
    failures += 1;
  } else {
    console.log(`PASS: ${msg}`);
  }
}

function dockerLabNames() {
  try {
    return execSync('docker ps --format "{{.Names}}"', { encoding: "utf8" })
      .split("\n")
      .map((s) => s.trim())
      .filter((n) => n.startsWith("etienne-lab-"));
  } catch {
    return [];
  }
}

async function waitHealth(ms = 20_000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const res = await fetch(`${HTTP}/health`);
      if (res.ok) return res.json();
    } catch {
      /* retry */
    }
    await sleep(200);
  }
  throw new Error("gateway health timeout");
}

function openSession(label, { headers = {}, expectReject = false } = {}) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(WS_URL, {
      headers: { Origin: ORIGIN, ...headers },
    });
    let buf = "";
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        ws.close();
        reject(new Error(`${label} timeout: ${buf.slice(-300)}`));
      }
    }, 45_000);

    ws.on("message", (data) => {
      buf += data.toString();
      if (!settled && buf.includes("[lab] ready")) {
        settled = true;
        clearTimeout(timer);
        const id = /session ([a-f0-9]+)/.exec(buf)?.[1];
        resolve({ label, ws, id, buf, rejected: false });
      }
      if (
        !settled &&
        expectReject &&
        (/capacity|disabled|rate limit|Per-client/i.test(buf) ||
          buf.includes("Lab capacity") ||
          buf.includes("temporarily disabled"))
      ) {
        /* wait for close */
      }
    });

    ws.on("close", () => {
      if (!settled && expectReject) {
        settled = true;
        clearTimeout(timer);
        resolve({ rejected: true, buf });
      }
    });

    ws.on("error", (err) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        if (expectReject) resolve({ rejected: true, buf, err: String(err) });
        else reject(err);
      }
    });
  });
}

async function main() {
  execSync("docker image inspect etienne-lab-sandbox:local", {
    stdio: "ignore",
  });

  const child = spawn("node", ["src/server.js"], {
    cwd: GATEWAY_DIR,
    env: {
      ...process.env,
      LAB_GATEWAY_PORT: String(PORT),
      LAB_SANDBOX_IMAGE: "etienne-lab-sandbox:local",
      LAB_ALLOWED_ORIGINS: ORIGIN,
      LAB_ADMIN_TOKEN: ADMIN,
      LAB_REQUIRE_ADMIN: "1",
      LAB_MAX_SESSIONS: String(MAX_SESSIONS),
      LAB_MAX_SESSIONS_PER_IP: "5",
      LAB_CREATE_RATE: "20",
      LAB_CREATE_WINDOW_MS: "60000",
      LAB_MAX_OUTPUT_BYTES: "1048576",
      LAB_IDLE_MS: "180000",
      LAB_MAX_MS: "180000",
      LAB_DISABLED: "0",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let gatewayLog = "";
  child.stdout.on("data", (d) => {
    gatewayLog += d.toString();
  });
  child.stderr.on("data", (d) => {
    gatewayLog += d.toString();
  });

  const shutdown = async () => {
    child.kill("SIGTERM");
    await sleep(400);
    try {
      child.kill("SIGKILL");
    } catch {
      /* ignore */
    }
    for (const name of dockerLabNames()) {
      try {
        execSync(`docker kill ${name}`, { stdio: "ignore" });
      } catch {
        /* ignore */
      }
    }
  };

  try {
    await waitHealth();
    console.log(`Beta gateway ready on ${PORT}`);

    // Capacity: fill MAX_SESSIONS then reject
    const a = await openSession("cap-A", {
      headers: { "X-Forwarded-For": "198.51.100.10" },
    });
    const b = await openSession("cap-B", {
      headers: { "X-Forwarded-For": "198.51.100.11" },
    });
    assert(Boolean(a.id && b.id), "two sessions start at capacity floor");
    const healthFull = await waitHealth();
    assert(healthFull.sessions === MAX_SESSIONS, "health reports full capacity");

    const over = await openSession("cap-over", {
      headers: { "X-Forwarded-For": "198.51.100.12" },
      expectReject: true,
    });
    assert(
      over.rejected === true || /capacity/i.test(over.buf || ""),
      "excess session rejected at capacity"
    );

    // Mid-session container kill
    const containerName = `etienne-lab-${a.id}`;
    assert(
      dockerLabNames().includes(containerName),
      "container present before mid-session kill"
    );
    execSync(`docker kill ${containerName}`, { stdio: "ignore" });

    await new Promise((resolve) => {
      const timer = setTimeout(resolve, 8_000);
      a.ws.on("close", () => {
        clearTimeout(timer);
        resolve();
      });
    });
    await sleep(800);
    const healthAfterKill = await waitHealth();
    assert(
      healthAfterKill.sessions <= MAX_SESSIONS - 1,
      "session count drops after container kill"
    );
    assert(
      !dockerLabNames().includes(containerName),
      "killed container no longer listed"
    );

    b.ws.close();
    await sleep(600);

    // Kill switch
    const killRes = await fetch(`${HTTP}/admin/kill`, {
      method: "POST",
      headers: { Authorization: `Bearer ${ADMIN}` },
    });
    const killJson = await killRes.json();
    assert(killRes.ok && killJson.disabled === true, "kill switch disables labs");
    await sleep(500);
    assert(dockerLabNames().length === 0, "kill switch destroys remaining containers");

    const blocked = await openSession("blocked", {
      headers: { "X-Forwarded-For": "198.51.100.20" },
      expectReject: true,
    });
    assert(
      blocked.rejected === true || /disabled/i.test(blocked.buf || ""),
      "new sessions rejected while disabled"
    );

    const enableRes = await fetch(`${HTTP}/admin/enable`, {
      method: "POST",
      headers: { Authorization: `Bearer ${ADMIN}` },
    });
    assert(enableRes.ok, "admin enable succeeds");

    const restored = await openSession("restored", {
      headers: { "X-Forwarded-For": "198.51.100.21" },
    });
    assert(Boolean(restored.id), "sessions restore after enable");
    restored.ws.close();
    await sleep(800);
    assert(
      !dockerLabNames().includes(`etienne-lab-${restored.id}`),
      "restored session container cleaned after close"
    );

    // Require-admin boot check via child already started with token — verify unauthorized kill
    const unauth = await fetch(`${HTTP}/admin/kill`, { method: "POST" });
    assert(unauth.status === 401, "admin kill without token is unauthorized");
  } catch (err) {
    console.error("ERROR:", err);
    console.error("Gateway log tail:\n", gatewayLog.slice(-2000));
    failures += 1;
  } finally {
    await shutdown();
  }

  if (failures > 0) {
    console.error(`\n${failures} failure(s)`);
    process.exit(1);
  }
  console.log("\nAll beta recovery checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
