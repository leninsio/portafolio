import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit/limiter";
import { createMemoryStore } from "@/lib/rate-limit/memory-store";

interface TestLimiterOptions {
  limit: number;
  windowMs: number;
  now: () => number;
}

function createTestLimiter({ limit, windowMs, now }: TestLimiterOptions) {
  return createRateLimiter({
    limit,
    windowMs,
    store: createMemoryStore(),
    now,
  });
}

describe("createRateLimiter", () => {
  it("permite 60 peticiones de la misma IP", () => {
    const limiter = createTestLimiter({
      limit: 60,
      windowMs: 60_000,
      now: () => 0,
    });

    for (let i = 0; i < 60; i += 1) {
      expect(limiter.check("203.0.113.7").allowed).toBe(true);
    }
  });

  it("rechaza la petición 61 con retryAfterSeconds > 0", () => {
    const limiter = createTestLimiter({
      limit: 60,
      windowMs: 60_000,
      now: () => 0,
    });

    for (let i = 0; i < 60; i += 1) {
      limiter.check("203.0.113.7");
    }

    const result = limiter.check("203.0.113.7");

    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("baja remaining de 59 a 0 a lo largo de la ventana", () => {
    const limiter = createTestLimiter({
      limit: 60,
      windowMs: 60_000,
      now: () => 0,
    });

    expect(limiter.check("203.0.113.7").remaining).toBe(59);

    for (let i = 0; i < 59; i += 1) {
      limiter.check("203.0.113.7");
    }

    expect(limiter.check("203.0.113.7").remaining).toBe(0);
  });

  it("vuelve a permitir cuando pasa la ventana", () => {
    let now = 0;
    const limiter = createTestLimiter({
      limit: 2,
      windowMs: 60_000,
      now: () => now,
    });

    expect(limiter.check("203.0.113.7").allowed).toBe(true);
    expect(limiter.check("203.0.113.7").allowed).toBe(true);
    expect(limiter.check("203.0.113.7").allowed).toBe(false);

    now = 60_000;

    expect(limiter.check("203.0.113.7").allowed).toBe(true);
  });

  it("mantiene contadores independientes para IPs distintas", () => {
    const limiter = createTestLimiter({
      limit: 1,
      windowMs: 60_000,
      now: () => 0,
    });

    expect(limiter.check("203.0.113.7").allowed).toBe(true);
    expect(limiter.check("198.51.100.9").allowed).toBe(true);
    expect(limiter.check("203.0.113.7").allowed).toBe(false);
  });
});
