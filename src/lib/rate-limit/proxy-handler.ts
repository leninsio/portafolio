import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/rate-limit/client-ip";
import type { RateLimiter } from "@/lib/rate-limit/limiter";

const RATE_LIMIT_MESSAGE =
  "Demasiadas peticiones. Intenta de nuevo en unos segundos.";

export function createRateLimitProxy(limiter: RateLimiter) {
  return function rateLimitProxy(request: NextRequest): NextResponse {
    const result = limiter.check(getClientIp(request.headers));

    const rateLimitHeaders = {
      "RateLimit-Limit": String(result.limit),
      "RateLimit-Remaining": String(result.remaining),
      "RateLimit-Reset": String(result.retryAfterSeconds),
    };

    if (!result.allowed) {
      return new NextResponse(RATE_LIMIT_MESSAGE, {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          "Retry-After": String(result.retryAfterSeconds),
        },
      });
    }

    const response = NextResponse.next();

    for (const [name, value] of Object.entries(rateLimitHeaders)) {
      response.headers.set(name, value);
    }

    return response;
  };
}
