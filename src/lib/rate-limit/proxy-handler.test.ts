import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { createRateLimiter } from "@/lib/rate-limit/limiter";
import { createMemoryStore } from "@/lib/rate-limit/memory-store";
import { createRateLimitProxy } from "@/lib/rate-limit/proxy-handler";

const MESSAGE = "Demasiadas peticiones. Intenta de nuevo en unos segundos.";

function requestFrom(ip: string) {
  return new NextRequest("http://localhost:3000/", {
    headers: { "x-forwarded-for": ip },
  });
}

function createProxy(limit = 2) {
  const limiter = createRateLimiter({
    limit,
    windowMs: 60_000,
    store: createMemoryStore(),
    now: () => 0,
  });

  return createRateLimitProxy(limiter);
}

describe("createRateLimitProxy", () => {
  it("responde 429 con el cuerpo exacto y las cuatro cabeceras", async () => {
    const proxy = createProxy(2);

    proxy(requestFrom("203.0.113.7"));
    proxy(requestFrom("203.0.113.7"));

    const response = proxy(requestFrom("203.0.113.7"));

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(response.headers.get("RateLimit-Limit")).toBe("2");
    expect(response.headers.get("RateLimit-Remaining")).toBe("0");
    expect(response.headers.get("RateLimit-Reset")).toBe("60");
    await expect(response.text()).resolves.toBe(MESSAGE);
  });

  it("sigue dejando pasar una IP distinta", () => {
    const proxy = createProxy(2);

    proxy(requestFrom("203.0.113.7"));
    proxy(requestFrom("203.0.113.7"));

    expect(proxy(requestFrom("203.0.113.7")).status).toBe(429);
    expect(proxy(requestFrom("198.51.100.9")).status).toBe(200);
  });

  it("agrega RateLimit-Remaining a las respuestas permitidas", () => {
    const proxy = createProxy(2);

    const response = proxy(requestFrom("203.0.113.7"));

    expect(response.status).toBe(200);
    expect(response.headers.get("RateLimit-Remaining")).toBe("1");
  });
});
