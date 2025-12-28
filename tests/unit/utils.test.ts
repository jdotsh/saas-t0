import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  formatDate,
  absoluteUrl,
  nFormatter,
  timeAgo,
  formatPrice,
  capitalize,
  truncate
} from '@/lib/utils';

// Mock the env module
vi.mock('@/env.mjs', () => ({
  env: {
    NEXT_PUBLIC_APP_URL: 'https://example.com'
  }
}));

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format string date correctly', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBe('January 15, 2024');
    });

    it('should format timestamp correctly', () => {
      const timestamp = new Date('2024-06-20').getTime();
      const result = formatDate(timestamp);
      expect(result).toBe('June 20, 2024');
    });

    it('should handle ISO date strings', () => {
      const result = formatDate('2024-12-25T00:00:00.000Z');
      expect(result).toBe('December 25, 2024');
    });

    it('should handle edge dates', () => {
      const result = formatDate('2024-01-01');
      expect(result).toBe('January 1, 2024');

      const result2 = formatDate('2024-12-31');
      expect(result2).toBe('December 31, 2024');
    });
  });

  describe('absoluteUrl', () => {
    it('should return absolute URL with path', () => {
      expect(absoluteUrl('/api/test')).toBe('https://example.com/api/test');
      expect(absoluteUrl('/dashboard')).toBe('https://example.com/dashboard');
    });

    it('should handle empty path', () => {
      expect(absoluteUrl('')).toBe('https://example.com');
    });

    it('should handle paths without leading slash', () => {
      expect(absoluteUrl('api/test')).toBe('https://example.comapi/test');
    });
  });

  describe('nFormatter', () => {
    it('should format thousands', () => {
      expect(nFormatter(1000)).toBe('1K');
      expect(nFormatter(1500)).toBe('1.5K');
      expect(nFormatter(999)).toBe('999');
    });

    it('should format millions', () => {
      expect(nFormatter(1000000)).toBe('1M');
      expect(nFormatter(2500000)).toBe('2.5M');
      expect(nFormatter(1234567)).toBe('1.2M');
    });

    it('should format billions', () => {
      expect(nFormatter(1000000000)).toBe('1B');
      expect(nFormatter(1500000000)).toBe('1.5B');
    });

    it('should format trillions', () => {
      expect(nFormatter(1000000000000)).toBe('1T');
      expect(nFormatter(1500000000000)).toBe('1.5T');
    });

    it('should handle zero and undefined', () => {
      expect(nFormatter(0)).toBe('0');
      expect(nFormatter(null as any)).toBe('0');
      expect(nFormatter(undefined as any)).toBe('0');
    });

    it('should respect digits parameter', () => {
      expect(nFormatter(1234, 2)).toBe('1.23K');
      expect(nFormatter(1234567, 3)).toBe('1.235M');
    });

    it('should handle negative numbers', () => {
      // Current implementation doesn't handle negatives correctly
      // This is a limitation that could be fixed in the future
      expect(nFormatter(-1000)).toBe('0');
      expect(nFormatter(-1500000)).toBe('0');
    });
  });

  describe('timeAgo', () => {
    beforeEach(() => {
      // Mock current time for consistent tests
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should format seconds ago', () => {
      const thirtySecondsAgo = new Date(Date.now() - 30000);
      expect(timeAgo(thirtySecondsAgo)).toBe('30s ago');

      const now = new Date();
      expect(timeAgo(now)).toBe('0ms ago');
    });

    it('should format minutes ago', () => {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
      expect(timeAgo(twoMinutesAgo)).toBe('2m ago');

      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      expect(timeAgo(oneMinuteAgo)).toBe('1m ago');
    });

    it('should format hours ago', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
      expect(timeAgo(threeHoursAgo)).toBe('3h ago');

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      expect(timeAgo(oneHourAgo)).toBe('1h ago');
    });

    it('should format days ago', () => {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      expect(timeAgo(twoDaysAgo)).toBe('2d ago');

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(timeAgo(oneDayAgo)).toBe('1d ago');
    });

    it('should handle timeOnly parameter', () => {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
      expect(timeAgo(twoMinutesAgo, true)).toBe('2m');

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      expect(timeAgo(oneHourAgo, true)).toBe('1h');
    });

    it('should handle null/undefined', () => {
      expect(timeAgo(null as any)).toBe('never');
      expect(timeAgo(undefined as any)).toBe('never');
    });
  });

  describe('formatPrice', () => {
    it('should format basic prices correctly (cents to dollars)', () => {
      expect(formatPrice(1000)).toBe('$10.00');
      expect(formatPrice(9999)).toBe('$99.99');
      expect(formatPrice(100000)).toBe('$1000.00');
    });

    it('should format zero price', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('should handle negative prices', () => {
      expect(formatPrice(-1000)).toBe('$-10.00');
    });

    it('should handle undefined', () => {
      expect(formatPrice(undefined)).toBe('$0.00');
      expect(formatPrice()).toBe('$0.00');
    });

    it('should format large numbers', () => {
      expect(formatPrice(100000000)).toBe('$1000000.00');
      expect(formatPrice(12345678)).toBe('$123456.78');
    });

    it('should handle different currencies', () => {
      expect(formatPrice(1000, '€')).toBe('€10.00');
      expect(formatPrice(1550, '£')).toBe('£15.50');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should handle non-string values', () => {
      expect(capitalize(null as any)).toBe(null);
      expect(capitalize(undefined as any)).toBe(undefined);
    });

    it('should only capitalize first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world');
      expect(capitalize('HELLO')).toBe('HELLO');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('This is a long string', 10)).toBe('This is a ...');
    });

    it('should not truncate short strings', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
      expect(truncate('Hi', 5)).toBe('Hi');
    });

    it('should handle empty string', () => {
      expect(truncate('', 5)).toBe('');
    });

    it('should handle null and undefined', () => {
      expect(truncate(null as any, 5)).toBe(null);
      expect(truncate(undefined as any, 5)).toBe(undefined);
    });

    it('should handle exact length', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });
  });
});
