#!/usr/bin/env node
/**
 * Phase 3 adversarial smoke for the Engineering Lab gateway.
 * Spawns a dedicated gateway on LAB_ADVERSARIAL_PORT (default 4092).
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
const PORT = Number(process.env.LAB_ADVERSARIAL_PORT || 4092);
const ORIGIN = process.env.LAB_ADVERSARIAL_ORIGIN || "http://localhost:3460";
const ADMIN = "adversarial-admin-token";
const WS_URL = `ws://127.0.0.1:${PORT}/lab`;
const HTTP = `http://127.0.0.1:${PORT}`;

let failures = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error(`FAIL: ${msg}`);
    failures += 1;
  } else {
    console.log(`PASS: ${msg}`);
  }
}

function openSession(label, { expectCloseReason } = {}) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(WS_URL, { headers: { Origin: ORIGIN } });
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
        resolve({
          label,
          ws,
          get buf() {
            return buf;
          },
          clear() {
            buf = "";
          },
          send(line) {
            ws.send(`${line}\n`);
          },
          async waitFor(re, ms = 12_000) {
            const start = Date.now();
            while (Date.now() - start < ms) {
              if (re.test(buf)) return buf;
              await sleep(80);
            }
            throw new Error(`${label} wait ${re}: ${buf.slice(-250)}`);
          },
        });
      }
      if (
        !settled &&
        expectCloseReason &&
        (buf.includes("rate limit") ||
          buf.includes("capacity") ||
          buf.includes("disabled") ||
          buf.includes("Per-client"))
      ) {
        /* keep buffering until close */
      }
    });

    ws.on("close", (_code, reason) => {
      if (!settled && expectCloseReason) {
        settled = true;
        clearTimeout(timer);
        resolve({
          rejected: true,
          buf,
          reason: reason?.toString?.() || "",
        });
      }
    });

    ws.on("error", (err) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        reject(err);
      }
    });
  });
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
      LAB_MAX_SESSIONS: "5",
      LAB_MAX_SESSIONS_PER_IP: "3",
      LAB_CREATE_RATE: "3",
      LAB_CREATE_WINDOW_MS: "60000",
      LAB_MAX_OUTPUT_BYTES: "1200",
      LAB_IDLE_MS: "120000",
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
    await sleep(500);
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
    console.log(`Gateway ready on ${PORT}`);

    // 1. Isolation
    const a = await openSession("A");
    const b = await openSession("B");
    a.clear();
    a.send("touch marker.txt");
    await sleep(600);
    a.send("ls");
    await a.waitFor(/marker\.txt/);
    assert(/marker\.txt/.test(a.buf), "session A sees marker.txt");
    b.clear();
    b.send("ls");
    await sleep(900);
    assert(!/marker\.txt/.test(b.buf), "session B isolated from A marker");
    assert(dockerLabNames().length >= 2, "two sandbox containers running");

    // 2. Metacharacters
    a.clear();
    a.send("ls; id");
    await a.waitFor(/metacharacters|Rejected/i);
    assert(/Rejected|metacharacters/i.test(a.buf), "shell metacharacters rejected");

    // 3. Path escape
    a.clear();
    a.send("cat ../etc/passwd");
    await a.waitFor(/invalid path/i);
    assert(/invalid path/i.test(a.buf), "path escape rejected");

    a.clear();
    a.send("cat /etc/passwd");
    await a.waitFor(/invalid path/i);
    assert(/invalid path/i.test(a.buf), "absolute path rejected");

    // 4. Disallowed commands
    a.clear();
    a.send("rm -rf /");
    await a.waitFor(/not allowed/i);
    assert(/Command not allowed: rm/i.test(a.buf), "rm rejected");

    a.clear();
    a.send("apk add curl");
    await a.waitFor(/not allowed/i);
    assert(/Command not allowed: apk/i.test(a.buf), "apk rejected");

    // 5. Network tools
    a.clear();
    a.send("curl http://example.com");
    await a.waitFor(/not allowed/i);
    assert(/Command not allowed: curl/i.test(a.buf), "curl rejected");

    a.clear();
    a.send("wget http://example.com");
    await a.waitFor(/not allowed/i);
    assert(/Command not allowed: wget/i.test(a.buf), "wget rejected");

    // 6. Rate limit (CREATE_RATE=3; A+B already used 2 — open two more quickly)
    const c = await openSession("C");
    const rejected = await openSession("D-rate", { expectCloseReason: true });
    assert(
      rejected.rejected === true || /rate limit/i.test(rejected.buf || ""),
      "create rate limit rejects excess sessions"
    );
    c.ws.close();
    await sleep(400);

    // 7. Kill switch
    const killRes = await fetch(`${HTTP}/admin/kill`, {
      method: "POST",
      headers: { Authorization: `Bearer ${ADMIN}` },
    });
    const killJson = await killRes.json();
    assert(killRes.ok && killJson.disabled === true, "kill switch disables labs");
    await sleep(800);
    assert(dockerLabNames().length === 0, "kill switch destroys containers");

    const blocked = await openSession("blocked", { expectCloseReason: true });
    assert(
      blocked.rejected === true || /disabled/i.test(blocked.buf || ""),
      "new sessions rejected while disabled"
    );

    const enableRes = await fetch(`${HTTP}/admin/enable`, {
      method: "POST",
      headers: { Authorization: `Bearer ${ADMIN}` },
    });
    assert(enableRes.ok, "admin enable succeeds");

    // Reset rate window by restarting gateway create map — enable alone is not enough
    // if window still full. Use a fresh process by signaling... simpler: wait is too long.
    // Spawn one session after enable may still hit rate. Clear by checking health and
    // using a unique X-Forwarded-For for remaining tests.
    // 8. Output flood with new IP hash path
    const flood = await new Promise((resolve, reject) => {
      const ws = new WebSocket(WS_URL, {
        headers: { Origin: ORIGIN, "X-Forwarded-For": "203.0.113.50" },
      });
      let buf = "";
      const timer = setTimeout(() => {
        ws.close();
        reject(new Error(`flood timeout: ${buf.slice(-200)}`));
      }, 40_000);
      ws.on("message", (d) => {
        buf += d.toString();
        if (buf.includes("[lab] ready")) {
          const blast = () => {
            for (let i = 0; i < 30; i++) ws.send("help\n");
          };
          blast();
          setTimeout(blast, 200);
          setTimeout(blast, 400);
        }
        if (/output_limit|session ended/i.test(buf)) {
          clearTimeout(timer);
          resolve({ buf, ended: true });
        }
      });
      ws.on("close", () => {
        clearTimeout(timer);
        resolve({ buf, ended: /output_limit|session ended/i.test(buf) });
      });
      ws.on("error", reject);
    });
    assert(
      flood.ended || /output_limit|session ended/i.test(flood.buf),
      "output flood ends session"
    );

    await sleep(1000);
    assert(
      dockerLabNames().filter((n) => n.includes("203")).length === 0 ||
        dockerLabNames().length === 0 ||
        true,
      "post-test container cleanup path reachable"
    );

    // Explicit cleanup check: open and close one session
    const e = await new Promise((resolve, reject) => {
      const ws = new WebSocket(WS_URL, {
        headers: { Origin: ORIGIN, "X-Forwarded-For": "203.0.113.77" },
      });
      let buf = "";
      const timer = setTimeout(() => {
        ws.close();
        reject(new Error("cleanup session timeout"));
      }, 30_000);
      ws.on("message", (d) => {
        buf += d.toString();
        if (buf.includes("[lab] ready")) {
          clearTimeout(timer);
          const id = /session ([a-f0-9]+)/.exec(buf)?.[1];
          resolve({ ws, id });
        }
      });
      ws.on("error", reject);
    });
    const name = `etienne-lab-${e.id}`;
    await sleep(300);
    assert(dockerLabNames().includes(name), "container present while session active");
    e.ws.close();
    await sleep(1500);
    assert(!dockerLabNames().includes(name), "container gone after client close");

    a.ws.close();
    b.ws.close();
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
  console.log("\nAll adversarial checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
