import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

let ratelimit: Ratelimit | null = null;

export function getRateLimiter() {
  if (!ratelimit && process.env.UPSTASH_REDIS_REST_URL) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: '@upstash/ratelimit'
    });
  }
  return ratelimit;
}

export async function checkRateLimit(identifier: string): Promise<boolean> {
  const limiter = getRateLimiter();
  if (!limiter) return true;

  const { success } = await limiter.limit(identifier);
  return success;
}

export function getIdentifier(req: NextRequest): string {
  return req.headers.get('x-forwarded-for') || req.ip || 'anonymous';
}

export async function ratelimitRequest(req: NextRequest): Promise<boolean> {
  const identifier = getIdentifier(req);
  return checkRateLimit(identifier);
}
