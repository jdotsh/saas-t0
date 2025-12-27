'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

/**
 * PromoBanner - Reusable promotional banner component
 *
 * Features:
 * - Dismissible with localStorage persistence
 * - Copy-to-clipboard with visual feedback
 * - Framer Motion animations
 * - Full WCAG 2.1 AA accessibility
 * - Mobile-first responsive design
 *
 * @example
 * ```tsx
 * <PromoBanner
 *   title="Boxing Day Special"
 *   discount="30% Off!"
 *   couponCode="BOX2025760"
 *   ctaText="View Pricing"
 *   ctaHref="#pricing"
 * />
 * ```
 */

export interface PromoBannerProps {
  /** Main promotional title */
  title?: string;
  /** Discount text to highlight */
  discount?: string;
  /** Coupon code for users to copy */
  couponCode?: string;
  /** Call-to-action text */
  ctaText?: string;
  /** Call-to-action link */
  ctaHref?: string;
  /** LocalStorage key for dismiss persistence (default: 'promo-banner-dismissed') */
  storageKey?: string;
  /** Custom className for container */
  className?: string;
  /** Callback when banner is dismissed */
  onDismiss?: () => void;
  /** Callback when coupon is copied */
  onCopy?: (code: string) => void;
}

export function PromoBanner({
  title = 'Boxing Day Special',
  discount = '30% Off!',
  couponCode = 'BOX2025760',
  ctaText = 'View Pricing',
  ctaHref = '#pricing',
  storageKey = 'promo-banner-dismissed',
  className,
  onDismiss,
  onCopy
}: PromoBannerProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  // Check if banner was dismissed on mount
  React.useEffect(() => {
    setIsClient(true);
    const dismissed = localStorage.getItem(storageKey);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, [storageKey]);

  // Handle dismiss with localStorage persistence
  const handleDismiss = React.useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
    onDismiss?.();
  }, [storageKey, onDismiss]);

  // Handle keyboard dismiss (Escape key)
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, handleDismiss]);

  // Handle copy to clipboard with feedback
  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setIsCopied(true);

      // Show success toast
      toast({
        title: 'Coupon Copied!',
        description: `Code "${couponCode}" copied to clipboard.`
      });

      onCopy?.(couponCode);

      // Reset icon after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      toast({
        title: 'Copy failed',
        description: 'Please copy the code manually.',
        variant: 'destructive'
      });
    }
  }, [couponCode, onCopy]);

  // Don't render on server or if dismissed
  if (!isClient || !isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        role="banner"
        aria-label="Promotional offer"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'relative overflow-hidden bg-background text-foreground',
          'border-b border-border',
          className
        )}
      >
        <div className="flex min-h-[44px] items-center justify-center px-4 py-2 sm:px-6">
          <div className="flex w-full max-w-screen-xl items-center justify-between gap-3 sm:justify-center">
            {/* Promotional Message */}
            <div className="flex flex-wrap items-center gap-2 text-sm sm:gap-2.5">
              {/* CTA Link */}
              <a
                href={ctaHref}
                className="hover:text-primary/80 font-medium tracking-tight underline underline-offset-4 transition-colors"
              >
                <span className="text-primary font-semibold">{title}:</span>{' '}
                <span className="font-semibold text-lime-500 dark:text-amber-500">
                  {discount}
                </span>
              </a>

              {/* Coupon Code & Copy Button */}
              <div className="flex items-center gap-1.5">
                <span
                  className="bg-background text-primary flex h-8 items-center justify-center rounded-md border px-2.5 text-xs font-medium tabular-nums"
                  aria-label={`Coupon code: ${couponCode}`}
                >
                  {couponCode}
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  title={isCopied ? 'Copied!' : 'Copy Coupon Code'}
                  aria-label={isCopied ? 'Coupon copied' : 'Copy coupon code'}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-md',
                    'border border-border transition-all duration-200',
                    'hover:border-primary hover:bg-muted',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    'active:scale-95',
                    // Larger touch target on mobile
                    'sm:h-8 sm:w-8'
                  )}
                >
                  <motion.div
                    key={isCopied ? 'check' : 'copy'}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-600 dark:text-green-500" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={handleDismiss}
              title="Dismiss banner"
              aria-label="Dismiss promotional banner"
              className={cn(
                'ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                'border border-transparent transition-all duration-200',
                'hover:border-border hover:bg-muted',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'active:scale-95',
                'sm:ml-3'
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Screen reader announcement for copy success */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {isCopied && `Coupon code ${couponCode} copied to clipboard`}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

/**
 * Hook to programmatically show/hide the banner
 *
 * @example
 * ```tsx
 * const { showBanner, hideBanner } = usePromoBanner();
 *
 * // Show banner
 * showBanner();
 *
 * // Hide and persist
 * hideBanner();
 * ```
 */
export function usePromoBanner(storageKey = 'promo-banner-dismissed') {
  const showBanner = React.useCallback(() => {
    localStorage.removeItem(storageKey);
    window.dispatchEvent(new Event('storage'));
  }, [storageKey]);

  const hideBanner = React.useCallback(() => {
    localStorage.setItem(storageKey, 'true');
    window.dispatchEvent(new Event('storage'));
  }, [storageKey]);

  return { showBanner, hideBanner };
}
