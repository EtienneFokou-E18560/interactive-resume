/** Engineering Lab configuration helpers (server + client safe). */

export const LAB_INVITE_COOKIE = "lab_invite";
export const LAB_INVITE_MAX_AGE_SEC = 8 * 60 * 60; // 8 hours

/** Client-bundled WS URL for owner local development. */
export function getPublicLabWsUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_LAB_WS_URL?.trim();
  return url || null;
}

/** Server-only gateway URL returned after invite unlock. */
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

/** Owner local: public WS URL alone enables the lab without invite. */
export function isLabEnabled(): boolean {
  return Boolean(getPublicLabWsUrl());
}

/** @deprecated Use getPublicLabWsUrl — kept for older call sites. */
export function getLabWsUrl(): string | null {
  return getPublicLabWsUrl();
}
