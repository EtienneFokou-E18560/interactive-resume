# Engineering Lab (local private beta)

Phase 4: hardened Docker sandboxes behind a local WebSocket gateway, invite-gated from the portfolio. Public HTTPS hosting is deferred.

Phase 5 prep: feature flags + analytics hooks for a future public rollout (`LAB_PUBLIC_ENABLED`, `LAB_PUBLIC_ROLLOUT_PERCENT`). Defaults keep public off. See [PHASE5_PREP.md](./PHASE5_PREP.md).

**Do not expose this gateway to the public internet.** See [PRIVATE_BETA.md](./PRIVATE_BETA.md) for the operator runbook.

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
LAB_REQUIRE_ADMIN=1 LAB_ADMIN_TOKEN=dev-lab-admin npm start
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
| Require admin | `LAB_REQUIRE_ADMIN` | `0` (set `1` for private beta) |
| Sandbox | read-only rootfs, tmpfs `/home/visitor` 32m + `/tmp` 16m, no network, CapDrop ALL, 256 MB / 0.5 CPU / 32 PIDs |

### Kill switch

```bash
curl -X POST -H "Authorization: Bearer $LAB_ADMIN_TOKEN" http://localhost:4091/admin/kill
curl -X POST -H "Authorization: Bearer $LAB_ADMIN_TOKEN" http://localhost:4091/admin/enable
```

## 3. Run the portfolio

Owner local (no invite UI):

```bash
NEXT_PUBLIC_LAB_WS_URL=ws://localhost:4091/lab npm run dev
```

Invite-gated private beta:

```bash
LAB_INVITE_CODE=shared-invite \
LAB_WS_URL=ws://localhost:4091/lab \
npm run dev
```

Open `/terminal`, unlock with the invite code if prompted, then **Launch Engineering Lab**.

Without `LAB_INVITE_CODE` and without `NEXT_PUBLIC_LAB_WS_URL`, the lab panel stays hidden (production default).

## Isolation check

1. Open two browser profiles (or two windows) to `/terminal`.
2. Launch a lab in each (same IP is capped at `LAB_MAX_SESSIONS_PER_IP`).
3. In session A: `touch marker.txt` then `ls`
4. In session B: `ls` — `marker.txt` must not appear.

## Smoke tests

```bash
npm run lab:adversarial
npm run lab:beta-smoke
```

See [SECURITY.md](./SECURITY.md) and [PRIVATE_BETA.md](./PRIVATE_BETA.md).

## Security notes

- Command allowlist is enforced inside `lab-shell` (no shell metacharacters; no `python3 -c`).
- Gateway enforces Origin, capacity, per-IP limits, create rate, output size, and kill switch.
- Portfolio invite codes are server-only (`LAB_INVITE_CODE`); never log typed codes.
- Structured gateway logs use session ids and IP hashes — not typed command content.
- Client IP for limits uses `X-Forwarded-For` first hop when present; only trust that behind a known proxy.
- Public TLS termination / always-on hosted gateway remains deferred (paid host).
