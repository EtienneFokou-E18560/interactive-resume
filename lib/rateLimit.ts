/**
 * Small fixed-window rate limiter kept in memory. On Vercel each function instance has its
 * own memory, so this is best effort: it stops one client flooding a warm instance, not a
 * distributed attack. Good enough next to the honeypot for a personal contact form.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()): { ok: true } | { ok: false; retryAfterSec: number } {
    // Drop expired windows so the map can't grow without bound.
    if (hits.size > 1000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true };
    }
    if (entry.count >= limit) {
      return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
    }
    entry.count += 1;
    return { ok: true };
  };
}

/** The caller's IP as Vercel reports it (first hop of x-forwarded-for), or "unknown". */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
