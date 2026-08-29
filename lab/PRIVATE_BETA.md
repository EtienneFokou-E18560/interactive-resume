# Engineering Lab — Private Beta Runbook (Phase 4)

Local-only private beta. **Do not** expose the gateway, Docker socket, or admin token to the public internet. Use LAN or an SSH tunnel if sharing with invited testers. Public HTTPS hosting is deferred until a paid always-on host is acceptable.

## Operator quick start

```bash
# 1. Build sandbox image
npm run lab:build

# 2. Start gateway (admin token required for private beta)
cd lab/gateway && npm install
LAB_REQUIRE_ADMIN=1 \
LAB_ADMIN_TOKEN=replace-with-long-secret \
LAB_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,https://etiennefokouresume.vercel.app \
npm start

# 3. Run portfolio with invite gate (separate terminal, repo root)
LAB_INVITE_CODE=shared-invite \
LAB_WS_URL=ws://localhost:4091/lab \
npm run dev
```

Owner shortcut (no invite UI): set `NEXT_PUBLIC_LAB_WS_URL=ws://localhost:4091/lab` instead of `LAB_INVITE_CODE` / `LAB_WS_URL`.

Open `/terminal`, enter the invite code (if gated), then **Launch Engineering Lab**.

## Sharing with a tester (LAN / SSH tunnel)

1. Run the gateway on your machine with Docker.
2. Allow the tester’s portfolio origin in `LAB_ALLOWED_ORIGINS` (usually the production Vercel URL).
3. Give them `LAB_INVITE_CODE` out of band (not in git, not in client bundles).
4. Point server-side `LAB_WS_URL` at a reachable WebSocket endpoint (e.g. `ws://your-lan-ip:4091/lab` or an SSH tunnel to localhost). Prefer tunnels over opening the port to the whole internet.

## Kill switch

```bash
curl -X POST -H "Authorization: Bearer $LAB_ADMIN_TOKEN" http://localhost:4091/admin/kill
curl -X POST -H "Authorization: Bearer $LAB_ADMIN_TOKEN" http://localhost:4091/admin/enable
```

Health: `GET http://localhost:4091/health` → `{ ok, disabled, sessions, max, maxPerIp }`.

## Capacity and recovery expectations

| Event | Expected behavior |
|-------|-------------------|
| Global session cap hit | New WS connects fail closed; message points to simulated CLI |
| Per-IP / create rate exceeded | Reject with rate/ip capacity reason; other IPs unaffected |
| Kill switch | Active sessions destroyed; new connects rejected until enable |
| Container killed mid-session | Client disconnects; gateway session count drops; no orphaned `etienne-lab-*` after cleanup |
| Gateway process restart | In-memory sessions gone; Docker may still need `docker ps` cleanup of leftovers |

## Smoke tests

```bash
npm run lab:adversarial   # Phase 3 security suite
npm run lab:beta-smoke    # Phase 4 recovery / capacity checks
```

## Explicit non-goals

- No public internet gateway in Phase 4
- No visitor accounts or file uploads
- No production cluster / cloud credentials in the sandbox
