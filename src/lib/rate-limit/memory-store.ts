import type { RateLimitStore } from "@/lib/rate-limit/types";

interface Counter {
  count: number;
  resetAt: number;
}

export function createMemoryStore(): RateLimitStore {
  const counters = new Map<string, Counter>();

  function removeExpired(now: number): void {
    for (const [key, counter] of counters) {
      if (counter.resetAt <= now) {
        counters.delete(key);
      }
    }
  }

  return {
    increment(key, windowMs, now) {
      removeExpired(now);

      const current = counters.get(key);

      if (!current) {
        const counter: Counter = { count: 1, resetAt: now + windowMs };
        counters.set(key, counter);

        return { count: counter.count, resetAt: counter.resetAt };
      }

      current.count += 1;

      return { count: current.count, resetAt: current.resetAt };
    },
  };
}
