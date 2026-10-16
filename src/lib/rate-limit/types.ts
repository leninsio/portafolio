export interface RateLimitStore {
  increment(
    key: string,
    windowMs: number,
    now: number,
  ): { count: number; resetAt: number };
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}
