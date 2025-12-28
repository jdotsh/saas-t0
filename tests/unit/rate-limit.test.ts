import { describe, it, expect, vi } from 'vitest';

// Simple test for rate limit configuration
describe('Rate Limit Configuration', () => {
  it('should have rate limit functions exported', async () => {
    // Mock the Redis environment variables
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';

    // Dynamically import to get fresh module
    const rateLimitModule = await import('@/lib/rate-limit');

    // Check that all rate limit functions are exported
    expect(rateLimitModule.ratelimitRequest).toBeDefined();
    expect(typeof rateLimitModule.ratelimitRequest).toBe('function');

    expect(rateLimitModule.ratelimitAuth).toBeDefined();
    expect(typeof rateLimitModule.ratelimitAuth).toBe('function');

    expect(rateLimitModule.ratelimitPublic).toBeDefined();
    expect(typeof rateLimitModule.ratelimitPublic).toBe('function');

    expect(rateLimitModule.ratelimitExpensive).toBeDefined();
    expect(typeof rateLimitModule.ratelimitExpensive).toBe('function');
  });

  it('should handle missing Redis configuration gracefully', async () => {
    // Clear environment variables
    const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
    const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    // Clear module cache to force reimport
    vi.resetModules();

    // Mock console.warn to suppress output
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Import module without Redis configured
    const { ratelimitRequest } = await import('@/lib/rate-limit');

    // Should allow requests when Redis not configured (fail open)
    const result = await ratelimitRequest('test-identifier');

    expect(result.success).toBe(true);
    expect(result.limit).toBe(0);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Rate limiting disabled: UPSTASH_REDIS_REST_URL not configured'
    );

    // Cleanup
    consoleSpy.mockRestore();

    // Restore environment variables for other tests
    if (originalUrl) process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    if (originalToken) process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
  });
});
