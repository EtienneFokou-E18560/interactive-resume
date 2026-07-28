const VISITOR_NAME_COOKIE = "visitor_name";
const MAX_NAME_LENGTH = 40;
const NAME_PATTERN = /^[\p{L}\p{M}\d][\p{L}\p{M}\d\s.'’-]*$/u;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  try {
    return decodeURIComponent(match.slice(name.length + 1));
  } catch {
    return null;
  }
}

/** Sanitize and validate a visitor display name from cookie or terminal input. */
export function sanitizeVisitorName(raw: string): string | null {
  const trimmed = raw.trim().slice(0, MAX_NAME_LENGTH);
  if (!trimmed || !NAME_PATTERN.test(trimmed)) return null;
  return trimmed;
}

export function getVisitorName(): string | null {
  const raw = readCookie(VISITOR_NAME_COOKIE);
  return raw ? sanitizeVisitorName(raw) : null;
}

export function setVisitorName(name: string): string | null {
  const sanitized = sanitizeVisitorName(name);
  if (!sanitized || typeof document === "undefined") return null;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${VISITOR_NAME_COOKIE}=${encodeURIComponent(sanitized)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  return sanitized;
}

export function clearVisitorName(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${VISITOR_NAME_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function welcomeMessage(name?: string | null): string {
  return name
    ? `Welcome, ${name}. Type 'help' to get started.`
    : "Welcome. Type 'help' to get started.";
}
