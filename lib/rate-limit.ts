/**
 * Rate Limiting Utility
 *
 * Uses Upstash Redis for distributed rate limiting.
 * This prevents abuse and DoS attacks on all API endpoints.
 *
 * Implementation inspired by next-money but adapted for our needs.
 *
 * IMPORTANT: Make sure to set these environment variables:
 * - UPSTASH_REDIS_REST_URL
 * - UPSTASH_REDIS_REST_TOKEN
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { logger } from '@/lib/logger';

// Create Redis instance (only if env vars are set)
let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
  });

  // Default rate limiter: 10 requests per 10 seconds
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
    prefix: 'nexus:ratelimit'
  });
}

/**
 * Rate limit an API request based on identifier (IP, user ID, etc.)
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param limit - Optional custom limit (defaults to 10 req/10s)
 * @returns { success: boolean, limit: number, remaining: number, reset: Date }
 */
export async function ratelimitRequest(
  identifier: string,
  customLimit?: {
    requests: number;
    window: `${number} ${'ms' | 's' | 'm' | 'h' | 'd'}`;
  }
) {
  // If Redis not configured, allow request (fail open for development)
  if (!redis) {
    logger.warn(
      'Rate limiting disabled: UPSTASH_REDIS_REST_URL not configured'
    );
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: new Date(),
      pending: Promise.resolve()
    };
  }

  // Use custom rate limiter if specified
  const limiter = customLimit
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(
          customLimit.requests,
          customLimit.window
        ),
        analytics: true,
        prefix: 'nexus:ratelimit'
      })
    : ratelimit;

  if (!limiter) {
    throw new Error('Rate limiter not initialized');
  }

  const result = await limiter.limit(identifier);
  return result;
}

/**
 * Stricter rate limiting for auth endpoints (5 req/min)
 */
export async function ratelimitAuth(identifier: string) {
  return ratelimitRequest(identifier, { requests: 5, window: '1 m' });
}

/**
 * More lenient rate limiting for public endpoints (30 req/10s)
 */
export async function ratelimitPublic(identifier: string) {
  return ratelimitRequest(identifier, { requests: 30, window: '10 s' });
}

/**
 * Very strict rate limiting for expensive operations (3 req/min)
 */
export async function ratelimitExpensive(identifier: string) {
  return ratelimitRequest(identifier, { requests: 3, window: '1 m' });
}

/**
 * Extract identifier from request (IP address or user ID)
 */
export function getIdentifier(req: Request, userId?: string): string {
  if (userId) return userId;

  // Try to get real IP from headers (Vercel, Cloudflare, etc.)
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');

  return forwarded?.split(',')[0] || realIp || 'anonymous';
}

// Export the default rate limiter instance
export { ratelimit };
