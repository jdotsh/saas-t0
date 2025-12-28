/**
 * PromoBanner Usage Examples
 *
 * This file demonstrates how to use the PromoBanner component in various scenarios.
 */

import { PromoBanner, usePromoBanner } from '@/components/ui/promo-banner';
import { logger } from '@/lib/logger';

// ============================================================================
// Example 1: Basic Usage - Add to Root Layout
// ============================================================================
// File: app/layout.tsx

export function RootLayoutExample() {
  return (
    <html lang="en">
      <body>
        {/* Add banner at the very top of the page */}
        <PromoBanner />

        {/* Rest of your layout */}
        <main>{/* Your content */}</main>
      </body>
    </html>
  );
}

// ============================================================================
// Example 2: Marketing Layout - Common Use Case
// ============================================================================
// File: app/(marketing)/layout.tsx

export function MarketingLayoutExample() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Promotional banner */}
      <PromoBanner
        title="Boxing Day Special"
        discount="30% Off!"
        couponCode="BOX2025760"
        ctaText="View Pricing"
        ctaHref="#pricing"
      />

      {/* Navigation */}
      <header>{/* Your nav component */}</header>

      {/* Main content */}
      <main className="flex-1">{/* Your page content */}</main>

      {/* Footer */}
      <footer>{/* Your footer */}</footer>
    </div>
  );
}

// ============================================================================
// Example 3: Custom Props
// ============================================================================

export function CustomPromoExample() {
  return (
    <PromoBanner
      title="Flash Sale"
      discount="50% OFF"
      couponCode="FLASH50"
      ctaText="Shop Now"
      ctaHref="/products"
      storageKey="flash-sale-dismissed" // Custom storage key
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white" // Custom styling
      onDismiss={() => logger.info('Banner dismissed')}
      onCopy={(code) => logger.info('Copied code', { code })}
    />
  );
}

// ============================================================================
// Example 4: Multiple Campaigns (Different Storage Keys)
// ============================================================================

export function MultiCampaignExample() {
  return (
    <>
      {/* Black Friday Banner */}
      <PromoBanner
        title="Black Friday"
        discount="40% Off!"
        couponCode="BF2025"
        storageKey="black-friday-banner"
      />

      {/* Cyber Monday Banner (shows separately) */}
      <PromoBanner
        title="Cyber Monday"
        discount="35% Off!"
        couponCode="CM2025"
        storageKey="cyber-monday-banner"
      />
    </>
  );
}

// ============================================================================
// Example 5: Programmatic Control with Hook
// ============================================================================

export function ProgrammaticControlExample() {
  const { showBanner, hideBanner } = usePromoBanner();

  return (
    <div>
      <PromoBanner />

      {/* Control buttons (e.g., in admin panel) */}
      <div className="flex gap-2 p-4">
        <button
          onClick={showBanner}
          className="rounded-md bg-green-500 px-4 py-2 text-white"
        >
          Show Banner
        </button>

        <button
          onClick={hideBanner}
          className="rounded-md bg-red-500 px-4 py-2 text-white"
        >
          Hide Banner
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Example 6: Conditional Rendering Based on Route
// ============================================================================

('use client');

import { usePathname } from 'next/navigation';

export function ConditionalBannerExample() {
  const pathname = usePathname();

  // Only show on marketing pages
  const showBanner =
    pathname?.startsWith('/') && !pathname?.startsWith('/dashboard');

  if (!showBanner) return null;

  return <PromoBanner />;
}

// ============================================================================
// Example 7: Time-Limited Campaign
// ============================================================================

('use client');

import { useEffect, useState } from 'react';

export function TimeLimitedBannerExample() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Campaign active from Dec 25-27, 2025
    const startDate = new Date('2025-12-25T00:00:00');
    const endDate = new Date('2025-12-27T23:59:59');
    const now = new Date();

    setIsActive(now >= startDate && now <= endDate);
  }, []);

  if (!isActive) return null;

  return (
    <PromoBanner
      title="Boxing Day Special"
      discount="30% Off!"
      couponCode="BOX2025760"
    />
  );
}

// ============================================================================
// Example 8: A/B Testing Different Messages
// ============================================================================

('use client');

export function ABTestBannerExample() {
  // Simple A/B test (50/50 split)
  const variant = Math.random() > 0.5 ? 'A' : 'B';

  if (variant === 'A') {
    return (
      <PromoBanner
        title="Limited Time Offer"
        discount="30% Off!"
        couponCode="SAVE30"
        storageKey="ab-test-variant-a"
      />
    );
  }

  return (
    <PromoBanner
      title="Exclusive Deal"
      discount="Get 30% Discount!"
      couponCode="EXCLUSIVE30"
      storageKey="ab-test-variant-b"
    />
  );
}

// ============================================================================
// Example 9: Integration with Analytics
// ============================================================================

('use client');

// Type for Google Analytics gtag
interface WindowWithGtag extends Window {
  gtag?: (
    command: string,
    action: string,
    params: Record<string, unknown>
  ) => void;
}

export function AnalyticsBannerExample() {
  const handleCopy = (code: string) => {
    // Track coupon copy event
    const win = window as WindowWithGtag;
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', 'coupon_copied', {
        coupon_code: code,
        campaign: 'boxing_day_2025'
      });
    }
  };

  const handleDismiss = () => {
    // Track banner dismiss event
    const win = window as WindowWithGtag;
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', 'promo_banner_dismissed', {
        campaign: 'boxing_day_2025'
      });
    }
  };

  return (
    <PromoBanner
      title="Boxing Day Special"
      discount="30% Off!"
      couponCode="BOX2025760"
      onCopy={handleCopy}
      onDismiss={handleDismiss}
    />
  );
}

// ============================================================================
// Example 10: Server Component with User-Specific Offers
// ============================================================================

/*
// File: app/layout.tsx (Server Component)

import { getUserSubscriptionPlan } from '@/lib/subscription';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { logger } from '@/lib/logger';

export async function ServerSidePersonalizedBanner() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    // Show banner for non-authenticated users
    return (
      <PromoBanner
        title="New User Special"
        discount="30% Off!"
        couponCode="WELCOME30"
        ctaText="Sign Up"
        ctaHref="/signup"
      />
    );
  }

  const subscription = await getUserSubscriptionPlan(user.id);

  // Don't show to pro users
  if (subscription?.isPro) {
    return null;
  }

  // Show upgrade offer for free tier
  return (
    <PromoBanner
      title="Upgrade to Pro"
      discount="First Month 50% Off!"
      couponCode="FIRSTPRO50"
      ctaText="Upgrade Now"
      ctaHref="/pricing"
    />
  );
}
*/

// Note: The above example is commented out to avoid type errors in the example file.
// Copy and use in your actual implementation as needed.
