/** Engineering Lab configuration helpers (server + client safe). */

export const LAB_INVITE_COOKIE = "lab_invite";
export const LAB_BUCKET_COOKIE = "lab_bucket";
export const LAB_INVITE_MAX_AGE_SEC = 8 * 60 * 60; // 8 hours
export const LAB_BUCKET_MAX_AGE_SEC = 60 * 60 * 24 * 365; // 1 year

/** Client-bundled WS URL for owner local development. */
export function getPublicLabWsUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_LAB_WS_URL?.trim();
  return url || null;
}

/** Server-only gateway URL returned after invite unlock / public rollout. */
export function getServerLabWsUrl(): string | null {
  const url =
    process.env.LAB_WS_URL?.trim() ||
    process.env.NEXT_PUBLIC_LAB_WS_URL?.trim();
  return url || null;
}

export function getLabInviteCode(): string | null {
  const code = process.env.LAB_INVITE_CODE?.trim();
  return code || null;
}

export function isInviteConfigured(): boolean {
  return Boolean(getLabInviteCode());
}

/** Master switch for anonymous public rollout (default off). */
export function isLabPublicEnabled(): boolean {
  const raw = process.env.LAB_PUBLIC_ENABLED?.trim().toLowerCase();
  return raw === "1" || raw === "true";
}

/** 0–100; default 0 keeps production on simulated CLI only. */
export function getLabPublicRolloutPercent(): number {
  const n = Number(process.env.LAB_PUBLIC_ROLLOUT_PERCENT ?? "0");
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, Math.floor(n)));
}

/** Deterministic 0–99 bucket from anonymous id (never log the id). */
export function labBucketPercent(bucketId: string): number {
  let hash = 0;
  for (let i = 0; i < bucketId.length; i += 1) {
    hash = (hash * 31 + bucketId.charCodeAt(i)) >>> 0;
  }
  return hash % 100;
}

export function isInLabPublicRollout(bucketId: string | undefined | null): boolean {
  if (!bucketId || !isLabPublicEnabled()) return false;
  const percent = getLabPublicRolloutPercent();
  if (percent <= 0) return false;
  if (percent >= 100) return true;
  return labBucketPercent(bucketId) < percent;
}

/** Owner local: public WS URL alone enables the lab without invite. */
export function isLabEnabled(): boolean {
  return Boolean(getPublicLabWsUrl());
}

/** @deprecated Use getPublicLabWsUrl — kept for older call sites. */
export function getLabWsUrl(): string | null {
  return getPublicLabWsUrl();
}
