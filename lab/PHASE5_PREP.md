# Engineering Lab — Phase 5 prep

Feature-flag and analytics plumbing for a future public rollout. **No public gateway is deployed.** Production defaults keep the lab off for anonymous visitors.

## Defaults (safe)

| Env | Default | Meaning |
|-----|---------|---------|
| `LAB_PUBLIC_ENABLED` | unset / `0` | Public rollout path off |
| `LAB_PUBLIC_ROLLOUT_PERCENT` | `0` | Nobody in the anonymous bucket |
| `LAB_WS_URL` | unset | No host URL to hand out |

Owner local (`NEXT_PUBLIC_LAB_WS_URL`) and invite (`LAB_INVITE_CODE` + cookie) paths are unchanged.

## Anonymous bucket

Middleware sets an httpOnly `lab_bucket` UUID on `/terminal` and `/api/lab/*`. Visitors are included when:

```text
LAB_PUBLIC_ENABLED=1
AND bucketPercent(lab_bucket) < LAB_PUBLIC_ROLLOUT_PERCENT
AND LAB_WS_URL is set
```

If the visitor is in-rollout but `LAB_WS_URL` is missing, the UI shows a soft “host not available” message and keeps the simulated CLI.

## Analytics (Vercel Analytics)

Anonymous events only — no command text, invite codes, or bucket ids:

- `lab_launch_requested`
- `lab_launch_succeeded`
- `lab_launch_failed`
- `lab_session_ended` — `reason`, `duration_bucket`
- `lab_rollout_exposure` — `in_rollout`, `percent`

## When a paid host exists later

1. Deploy gateway with HTTPS and update `LAB_WS_URL` / origins.
2. Set `LAB_PUBLIC_ENABLED=1` and raise `LAB_PUBLIC_ROLLOUT_PERCENT` gradually (e.g. 1 → 5 → 25).
3. Watch Analytics for launch success/fail and session duration buckets.
4. Keep `LAB_REQUIRE_ADMIN=1` and the kill switch runbook from Phase 4.

Do not enable public rollout on production without an always-on host and capacity limits.
