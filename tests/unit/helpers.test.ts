import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getURL,
  postData,
  toDateTime,
  calculateTrialEndUnixTimestamp,
  getStatusRedirect,
  getErrorRedirect
} from '@/utils/helpers';

describe('Helper Functions', () => {
  describe('getURL', () => {
    beforeEach(() => {
      // Reset environment variables
      delete process.env.NEXT_PUBLIC_APP_URL;
      delete process.env.NEXT_PUBLIC_VERCEL_URL;
    });

    it('should use NEXT_PUBLIC_APP_URL when set', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
      expect(getURL()).toBe('https://example.com');
      expect(getURL('api/test')).toBe('https://example.com/api/test');
    });

    it('should use NEXT_PUBLIC_VERCEL_URL when APP_URL not set', () => {
      process.env.NEXT_PUBLIC_VERCEL_URL = 'example.vercel.app';
      expect(getURL()).toBe('https://example.vercel.app');
    });

    it('should default to localhost when no env vars set', () => {
      expect(getURL()).toBe('http://localhost:3000');
      expect(getURL('test')).toBe('http://localhost:3000/test');
    });

    it('should handle paths with leading slashes', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://example.com/';
      expect(getURL('/api/test')).toBe('https://example.com/api/test');
    });

    it('should handle URLs with trailing slashes', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://example.com///';
      expect(getURL()).toBe('https://example.com');
    });

    it('should add https to URLs without protocol', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'example.com';
      expect(getURL()).toBe('https://example.com');
    });
  });

  describe('postData', () => {
    it('should make POST request with correct headers', async () => {
      const mockResponse = { success: true };
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await postData({
        url: '/api/test',
        data: { price: { id: 'price_123' } as any }
      });

      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ price: { id: 'price_123' } })
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle requests without data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ success: true })
      });

      await postData({ url: '/api/test' });

      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(undefined)
      });
    });
  });

  describe('toDateTime', () => {
    it('should convert seconds to Date object', () => {
      const seconds = 1609459200; // 2021-01-01 00:00:00 UTC
      const date = toDateTime(seconds);

      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(seconds * 1000);
    });

    it('should handle zero seconds (Unix epoch)', () => {
      const date = toDateTime(0);
      expect(date.toISOString()).toBe('1970-01-01T00:00:00.000Z');
    });

    it('should handle negative seconds', () => {
      const date = toDateTime(-3600);
      expect(date.toISOString()).toBe('1969-12-31T23:00:00.000Z');
    });
  });

  describe('calculateTrialEndUnixTimestamp', () => {
    it('should return undefined for null trial period', () => {
      expect(calculateTrialEndUnixTimestamp(null)).toBeUndefined();
    });

    it('should return undefined for undefined trial period', () => {
      expect(calculateTrialEndUnixTimestamp(undefined)).toBeUndefined();
    });

    it('should return undefined for trial period less than 2 days', () => {
      expect(calculateTrialEndUnixTimestamp(0)).toBeUndefined();
      expect(calculateTrialEndUnixTimestamp(1)).toBeUndefined();
    });

    it('should calculate correct trial end for valid period', () => {
      const now = Date.now();
      const trialDays = 7;
      const result = calculateTrialEndUnixTimestamp(trialDays);

      expect(result).toBeDefined();
      expect(result).toBeGreaterThan(Math.floor(now / 1000));

      // Check it's approximately correct (within a few seconds)
      const expectedEnd = Math.floor(
        (now + (trialDays + 1) * 24 * 60 * 60 * 1000) / 1000
      );
      expect(Math.abs(result! - expectedEnd)).toBeLessThan(5);
    });

    it('should handle large trial periods', () => {
      const result = calculateTrialEndUnixTimestamp(365);
      expect(result).toBeDefined();
      expect(result).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });
  });

  describe('getStatusRedirect', () => {
    it('should generate status redirect URL with basic parameters', () => {
      const result = getStatusRedirect(
        '/dashboard',
        'Success',
        'Operation completed'
      );
      expect(result).toBe(
        '/dashboard?status=Success&status_description=Operation%20completed'
      );
    });

    it('should handle empty description', () => {
      const result = getStatusRedirect('/dashboard', 'Success');
      expect(result).toBe('/dashboard?status=Success');
    });

    it('should include disable_button when true', () => {
      const result = getStatusRedirect('/dashboard', 'Success', '', true);
      expect(result).toBe('/dashboard?status=Success&disable_button=true');
    });

    it('should include arbitrary parameters', () => {
      const result = getStatusRedirect(
        '/dashboard',
        'Success',
        '',
        false,
        'foo=bar&baz=qux'
      );
      expect(result).toBe('/dashboard?status=Success&foo=bar&baz=qux');
    });

    it('should encode special characters', () => {
      const result = getStatusRedirect(
        '/dashboard',
        'Test & Status',
        'Description with spaces & symbols'
      );
      expect(result).toBe(
        '/dashboard?status=Test%20%26%20Status&status_description=Description%20with%20spaces%20%26%20symbols'
      );
    });
  });

  describe('getErrorRedirect', () => {
    it('should generate error redirect URL with basic parameters', () => {
      const result = getErrorRedirect(
        '/login',
        'AuthError',
        'Invalid credentials'
      );
      expect(result).toBe(
        '/login?error=AuthError&error_description=Invalid%20credentials'
      );
    });

    it('should handle empty description', () => {
      const result = getErrorRedirect('/login', 'AuthError');
      expect(result).toBe('/login?error=AuthError');
    });

    it('should include disable_button when true', () => {
      const result = getErrorRedirect('/login', 'AuthError', '', true);
      expect(result).toBe('/login?error=AuthError&disable_button=true');
    });

    it('should include arbitrary parameters', () => {
      const result = getErrorRedirect(
        '/login',
        'AuthError',
        '',
        false,
        'retry=true'
      );
      expect(result).toBe('/login?error=AuthError&retry=true');
    });

    it('should handle all parameters combined', () => {
      const result = getErrorRedirect(
        '/login',
        'Error',
        'Test error',
        true,
        'foo=bar'
      );
      expect(result).toBe(
        '/login?error=Error&error_description=Test%20error&disable_button=true&foo=bar'
      );
    });
  });
});
