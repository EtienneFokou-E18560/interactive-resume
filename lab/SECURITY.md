# Engineering Lab — Security Checklist

Local hardened PoC (Phase 3) + local private beta (Phase 4). Do not expose the gateway to the public internet. Public HTTPS hosting is deferred.

## Container isolation

- [x] Runs as a dedicated non-root user (`visitor`, uid 10001)
- [x] Privileged mode is disabled
- [x] All unnecessary Linux capabilities are dropped (`CapDrop: ALL`)
- [x] `no-new-privileges` is enabled
- [x] Container runtime socket is not mounted into the sandbox
- [x] Host paths, credentials, and environment secrets are not mounted into the sandbox
- [x] Root filesystem is read-only
- [x] Writable space is temporary tmpfs (`/home/visitor`, `/tmp`), size-limited, destroyed with the session
- [x] CPU, memory, process, and execution-time limits are enforced (idle + max lifetime)

## Network and commands

- [x] Outbound network access is disabled by default (`NetworkDisabled`)
- [x] No allowlisted network destinations (stubs only for kubectl/terraform)
- [x] Package managers and remote download tools are unavailable to the visitor
- [x] Command policy is enforced in `lab-shell` on the server side
- [x] Shell escapes and command chaining are rejected (adversarial smoke)
- [x] Output size is limited per session (`LAB_MAX_OUTPUT_BYTES`)

## Session gateway

- [x] Session identifiers are random UUIDs, short-lived, bound to one sandbox
- [x] Origin allowlist is enforced (TLS / public reverse proxy deferred)
- [x] Session creation is rate limited per client IP
- [x] Per-IP and global concurrency limits exist
- [x] Idle and maximum-lifetime timers are enforced server-side
- [x] Global kill switch terminates and disables labs (`POST /admin/kill`)
- [x] Capacity / disable / rate failures fail closed with simulated-CLI guidance
- [x] `LAB_REQUIRE_ADMIN=1` fails closed without `LAB_ADMIN_TOKEN`

## Private beta (Phase 4)

- [x] Portfolio invite unlock via server-only `LAB_INVITE_CODE` (httpOnly cookie)
- [x] Server-side `LAB_WS_URL` returned only after successful unlock
- [x] No visitor-facing env-var / setup instructions
- [x] Operator runbook (`PRIVATE_BETA.md`)
- [x] Recovery / capacity beta smoke (`npm run lab:beta-smoke`)
- [ ] Public HTTPS gateway on a paid always-on host (deferred)

## Phase 5 prep (flags only — no public host)

- [x] `LAB_PUBLIC_ENABLED` / `LAB_PUBLIC_ROLLOUT_PERCENT` (default off / 0%)
- [x] Anonymous `lab_bucket` cookie for deterministic rollout
- [x] Analytics hooks: launch success/fail, session ended, rollout exposure (no command text)
- [ ] Enable public rollout on production (blocked until paid always-on host)

## Privacy and operations

- [x] Command payloads are not logged (structured reason codes + IP hash only)
- [x] Invite codes are never logged
- [x] Logs are JSON operational / security events
- [ ] Log retention period (ops policy — later)
- [ ] Alerts for blocked commands / unusual volume (later)
- [ ] Image CVE scanning schedule (later)
- [ ] Dependency update owner / schedule (later)

## Adversarial tests (`npm run lab:adversarial`)

- [x] Attempt to access paths outside the workspace (`..`, absolute paths)
- [x] Attempt privilege / package tools (`apk`, `rm`, shell metacharacters)
- [x] Attempt outbound network tools (`curl`, `wget`)
- [x] Attempt to reach another visitor's session (isolation)
- [x] Attempt to exceed create rate / capacity
- [x] Kill switch ends sessions and blocks new ones
- [x] Output flood hits cap and session ends
- [x] Session containers disappear after termination

## Recovery tests (`npm run lab:beta-smoke`)

- [x] Mid-session container kill disconnects cleanly and frees capacity
- [x] Filling `LAB_MAX_SESSIONS` rejects the next connect
- [x] Kill switch rejects new connects; enable restores launches
