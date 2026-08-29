# Engineering Lab (local hardened PoC)

Phase 3: disposable Docker sandboxes behind a WebSocket gateway with read-only rootfs, tmpfs workspace, rate limits, output caps, and a kill switch. The portfolio xterm client enables when `NEXT_PUBLIC_LAB_WS_URL` is set.

**Do not expose this gateway to the public internet.** HTTPS, invite codes, and production deploy are Phase 4.

## Prerequisites

- Docker Desktop (or Engine) running
- Node 20+

## 1. Build the sandbox image

```bash
# from repo root
npm run lab:build
```

## 2. Start the gateway

```bash
cd lab/gateway
npm install
LAB_ADMIN_TOKEN=dev-lab-admin npm start
```

Health: `http://localhost:4091/health` → `{ ok, disabled, sessions, max, maxPerIp }`

### Defaults

| Setting | Env | Default |
|---------|-----|---------|
| Port | `LAB_GATEWAY_PORT` | `4091` |
| Idle timeout | `LAB_IDLE_MS` | 5 minutes |
| Max lifetime | `LAB_MAX_MS` | 10 minutes |
| Global concurrent | `LAB_MAX_SESSIONS` | 5 |
| Per-IP concurrent | `LAB_MAX_SESSIONS_PER_IP` | 2 |
| Create rate | `LAB_CREATE_RATE` / `LAB_CREATE_WINDOW_MS` | 3 / 60s |
| Output cap | `LAB_MAX_OUTPUT_BYTES` | 1 MiB |
| Origins | `LAB_ALLOWED_ORIGINS` | localhost:3000, 127.0.0.1:3000, :3460 |
| Kill at boot | `LAB_DISABLED` | `0` |
| Admin token | `LAB_ADMIN_TOKEN` | (empty = admin API disabled) |
| Sandbox | read-only rootfs, tmpfs `/home/visitor` 32m + `/tmp` 16m, no network, CapDrop ALL, 256 MB / 0.5 CPU / 32 PIDs |

### Kill switch

```bash
# disable + destroy all sessions
curl -X POST -H "Authorization: Bearer $LAB_ADMIN_TOKEN" http://localhost:4091/admin/kill

# re-enable launches
curl -X POST -H "Authorization: Bearer $LAB_ADMIN_TOKEN" http://localhost:4091/admin/enable
```

## 3. Run the portfolio with lab enabled

```bash
# from repo root
NEXT_PUBLIC_LAB_WS_URL=ws://localhost:4091/lab npm run dev
```

Open `/terminal` and click **Launch Engineering Lab**.

## Isolation check

1. Open two browser profiles (or two windows) to `/terminal`.
2. Launch a lab in each (same IP is capped at `LAB_MAX_SESSIONS_PER_IP`).
3. In session A: `touch marker.txt` then `ls`
4. In session B: `ls` — `marker.txt` must not appear.

## Adversarial smoke

With Docker available and the image built:

```bash
npm run lab:adversarial
```

See [SECURITY.md](./SECURITY.md) for the checklist.

## Security notes

- Command allowlist is enforced inside `lab-shell` (no shell metacharacters; no `python3 -c`).
- Gateway enforces Origin, capacity, per-IP limits, create rate, output size, and kill switch.
- Structured logs use session ids and IP hashes — not typed command content.
- Client IP for limits uses `X-Forwarded-For` first hop when present; only trust that behind a known proxy (Phase 4).
