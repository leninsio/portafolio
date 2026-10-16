import { createRateLimiter } from "@/lib/rate-limit/limiter";
import { createMemoryStore } from "@/lib/rate-limit/memory-store";
import { createRateLimitProxy } from "@/lib/rate-limit/proxy-handler";

const limiter = createRateLimiter({
  limit: 60,
  windowMs: 60_000,
  store: createMemoryStore(),
});

export const proxy = createRateLimitProxy(limiter);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[^/]+$).*)"],
};
