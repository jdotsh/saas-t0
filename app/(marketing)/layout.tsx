import { marketingConfig } from '@/config/marketing';
import FooterPrimary from '@/components/footer-primary';
import CircularNavigation from '@/components/navigation';
import { PromoBanner } from '@/components/ui/promo-banner';
import React from 'react';

import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';

export const dynamic = 'force-dynamic';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children
}: MarketingLayoutProps) {
  const supabase = createClient();
  const user = await getUser(supabase);

  return (
    <div className="flex min-h-screen flex-col items-center w-full">
      {/* Promotional Banner - Boxing Day Special */}
      <PromoBanner
        title="Boxing Day Special"
        discount="30% Off!"
        couponCode="BOX2025760"
        ctaText="View Pricing"
        ctaHref="#pricing"
      />

      <CircularNavigation
        items={marketingConfig.mainNav}
        user={user ? true : false}
      />
      <main className="flex-1">{children}</main>
      <FooterPrimary />
    </div>
  );
}
