# Engineering Lab (local PoC)

Phase 2 proof of concept: disposable Docker sandboxes behind a WebSocket gateway, plus an xterm client in the portfolio when `NEXT_PUBLIC_LAB_WS_URL` is set.

## Prerequisites

- Docker Desktop (or Engine) running
- Node 20+

## 1. Build the sandbox image

From the repo `lab/` directory:

```bash
docker build -t etienne-lab-sandbox:local -f sandbox/Dockerfile .
```

## 2. Start the gateway

```bash
cd gateway
npm install
npm start
```

Health check: `http://localhost:4091/health`

Defaults:

| Setting | Value |
|---------|--------|
| Port | `4091` |
| Idle timeout | 5 minutes |
| Max lifetime | 10 minutes |
| Max concurrent sessions | 5 |
| Network | disabled on containers |
| Memory | 256 MB |
| CPU | 0.5 |
| PIDs | 32 |

## 3. Run the portfolio with lab enabled

```bash
# from repo root
NEXT_PUBLIC_LAB_WS_URL=ws://localhost:4091/lab npm run dev
```

Open `/terminal` and click **Launch Engineering Lab**.

## Isolation check

1. Open two browser profiles (or two windows) to `/terminal`.
2. Launch a lab in each.
3. In session A: `echo a-session > marker.txt` then `ls`
4. In session B: `ls` — `marker.txt` must not appear.
5. Confirm `docker ps` shows two `etienne-lab-*` containers.

## Security notes (PoC)

- Command allowlist is enforced inside `lab-shell` (no shell metacharacters).
- Gateway also checks `Origin` and capacity.
- Phase 3 hardens further (read-only rootfs, tighter audit, kill switch).

**Do not expose this gateway to the public internet.**
