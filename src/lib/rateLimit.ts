/**
 * A small fixed-window rate limiter held in the function's memory.
 *
 * On Vercel, each warm function instance keeps its own counts, so this is a
 * per-instance limit: it stops a single client hammering the endpoint and
 * caps the email volume any one instance can send, without adding a
 * dependency or a datastore. For a hard, global limit, add a Vercel WAF rate
 * limiting rule for POST /api/enquire (see HANDOVER.md, "Enquiry endpoint").
 */
type Bucket = { count: number; resetAt: number };

export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const buckets = new Map<string, Bucket>();
  return function hit(key: string, now = Date.now()): { allowed: boolean; retryAfterS: number } {
    let b = buckets.get(key);
    if (!b || b.resetAt <= now) {
      // Keep memory bounded: drop expired buckets, then the oldest if still full.
      if (buckets.size >= maxKeys) {
        for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
        if (buckets.size >= maxKeys) buckets.delete(buckets.keys().next().value as string);
      }
      b = { count: 0, resetAt: now + windowMs };
      buckets.set(key, b);
    }
    b.count += 1;
    return { allowed: b.count <= limit, retryAfterS: Math.max(1, Math.ceil((b.resetAt - now) / 1000)) };
  };
}

/** The client address as Vercel reports it. Never trusted for anything but rate limiting. */
export function clientKey(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || headers.get("x-real-ip") || "unknown";
}
