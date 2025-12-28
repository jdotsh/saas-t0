import { describe, it, expect } from 'vitest';
import { cn } from '@/utils/cn';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('btn', isActive && 'active', isDisabled && 'disabled')).toBe(
      'btn active'
    );
  });

  it('should merge Tailwind classes with conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['px-2', 'py-1'], 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500');
  });

  it('should handle undefined and null values', () => {
    expect(cn('btn', undefined, null, 'primary')).toBe('btn primary');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('should handle objects with boolean values', () => {
    expect(
      cn({
        'text-blue-500': true,
        'text-red-500': false,
        'font-bold': true
      })
    ).toBe('text-blue-500 font-bold');
  });

  it('should handle duplicate class names', () => {
    // Note: clsx doesn't deduplicate by default, twMerge handles conflicts
    expect(cn('btn', 'btn', 'primary')).toBe('btn btn primary');
  });

  it('should handle complex Tailwind merging', () => {
    expect(cn('bg-red-500 hover:bg-red-700', 'bg-blue-500')).toBe(
      'hover:bg-red-700 bg-blue-500'
    );
  });

  it('should preserve important modifiers', () => {
    expect(cn('!p-4', 'p-2')).toBe('!p-4 p-2');
  });
});
