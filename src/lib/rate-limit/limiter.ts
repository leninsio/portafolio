import type { RateLimitResult, RateLimitStore } from "@/lib/rate-limit/types";

export interface RateLimiter {
  check(key: string): RateLimitResult;
}

export interface RateLimiterOptions {
  limit: number;
  windowMs: number;
  store: RateLimitStore;
  now?: () => number;
}

export function createRateLimiter({
  limit,
  windowMs,
  store,
  now = Date.now,
}: RateLimiterOptions): RateLimiter {
  return {
    check(key) {
      const currentTime = now();
      const { count, resetAt } = store.increment(key, windowMs, currentTime);

      return {
        allowed: count <= limit,
        limit,
        remaining: Math.max(0, limit - count),
        resetAt,
        retryAfterSeconds: Math.max(
          0,
          Math.ceil((resetAt - currentTime) / 1000),
        ),
      };
    },
  };
}
