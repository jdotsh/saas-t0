'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Tables } from '@/types/db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { Check, Loader2, Sparkles, Star, Zap } from 'lucide-react';
import pricingPlans from '@/config/pricing';
import { dummyPricing } from '@/config/pricing';
import { cn } from '@/lib/utils';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function PricingRounded({
  user,
  products,
  subscription
}: Props) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  const displayProducts = products.length ? products : dummyPricing;

  if (!displayProducts.length) {
    return (
      <section className="w-full max-w-7xl mx-auto" id="pricing">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-foreground sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-primary underline hover:text-primary/80 transition-colors"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6" id="pricing">
        <div className="flex flex-col items-center justify-center w-full min-h-screen py-12 sm:py-16 md:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center px-3 sm:px-4 tracking-tight text-foreground animate-fade-in">
            Choose your plan
          </h1>
          <p className="mt-3 sm:mt-4 text-center text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl px-3 sm:px-4 animate-slide-up">
            Start free, upgrade when you're ready. All plans include 14-day
            trial.
          </p>
          {displayProducts.length === 0 && (
            <p className="mt-4 text-center text-xs sm:text-sm text-destructive px-4 max-w-2xl">
              Note: This is dummy pricing data. Please add your own pricing data
              in the Stripe Dashboard to see actual plans. Alternatively, you
              may use the Stripe Fixtures command to create your own pricing
              data, see{' '}
              <a
                href="https://hikari.antoineross.com/docs/configure/stripe/local"
                className="underline hover:text-destructive/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                documentation
              </a>
              .
            </p>
          )}

          {/* Billing Toggle */}
          <div
            className="flex items-center justify-center mt-8 gap-1 bg-muted/50 p-1 rounded-full w-fit mx-auto animate-scale-in"
            role="tablist"
            aria-label="Billing period"
          >
            <Button
              className={cn(
                'px-6 py-2 rounded-full transition-all duration-200',
                billingInterval === 'month'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'bg-transparent text-muted-foreground hover:text-foreground'
              )}
              variant="ghost"
              onClick={() => setBillingInterval('month')}
              role="tab"
              aria-selected={billingInterval === 'month'}
              aria-controls="pricing-cards"
            >
              Monthly
            </Button>
            <Button
              className={cn(
                'px-6 py-2 rounded-full transition-all duration-200 relative',
                billingInterval === 'year'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'bg-transparent text-muted-foreground hover:text-foreground'
              )}
              variant="ghost"
              onClick={() => setBillingInterval('year')}
              role="tab"
              aria-selected={billingInterval === 'year'}
              aria-controls="pricing-cards"
            >
              Yearly
              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </Button>
          </div>

          {/* Pricing Cards */}
          <div
            id="pricing-cards"
            className="grid gap-6 sm:gap-8 mt-10 md:mt-12 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
            role="tabpanel"
            aria-labelledby="billing-toggle"
          >
            {displayProducts.map((product, productIndex) => {
              const price = product?.prices?.find(
                (price) => price.interval === billingInterval
              );
              if (!price) return null;

              const priceString = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: price.currency || 'USD',
                minimumFractionDigits: 0
              }).format((price?.unit_amount || 0) / 100);

              const isActive = subscription
                ? product.name === subscription?.prices?.products?.name
                : false;

              // Determine if this is the featured/popular plan (middle card)
              const isFeatured =
                productIndex === 1 && displayProducts.length >= 3;

              // Use features from the pricingPlans config
              const plan = pricingPlans.find(
                (plan) => plan.name === product.name
              );
              const features = plan ? plan.features : [];

              return (
                <Card
                  key={product.id}
                  className={cn(
                    'relative w-full rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover-lift animate-slide-up',
                    isFeatured
                      ? 'bg-gradient-to-br from-[hsl(var(--card-featured))] to-[hsl(var(--card-elevated))] border-[hsl(var(--pricing-featured-border))] md:scale-[1.02] lg:scale-105 md:z-10 shadow-2xl dark:glow-md'
                      : isActive
                        ? 'bg-[hsl(var(--card-elevated))] border-primary shadow-lg'
                        : 'bg-[hsl(var(--card))] border-border hover:border-primary/50 shadow-md',
                    'hover:shadow-xl'
                  )}
                  style={{
                    animationDelay: `${productIndex * 100}ms`
                  }}
                >
                  {/* Most Popular Badge */}
                  {isFeatured && (
                    <span
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--pricing-badge-bg))] text-[hsl(var(--pricing-badge-text))] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg animate-pulse-slow"
                      aria-label="Most popular plan"
                    >
                      <Star className="inline-block w-3 h-3 mr-1" />
                      Most Popular
                    </span>
                  )}

                  {/* Active Badge */}
                  {isActive && (
                    <span
                      className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                      aria-label="Your current plan"
                    >
                      Current Plan
                    </span>
                  )}

                  <CardHeader className="p-0 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl sm:text-2xl font-semibold text-[hsl(var(--text-primary))]">
                        {product.name}
                      </CardTitle>
                      {isFeatured && (
                        <Sparkles className="w-5 h-5 text-primary animate-pulse-slow" />
                      )}
                    </div>
                    <p className="text-sm text-[hsl(var(--text-secondary))]">
                      {product.name === 'Free'
                        ? 'Perfect to get started'
                        : product.name === 'Pro'
                          ? 'For power users'
                          : 'For teams & organizations'}
                    </p>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="mb-8">
                      <span className="text-5xl font-bold text-[hsl(var(--text-primary))]">
                        {priceString.replace(/\.\d+$/, '')}
                      </span>
                      <span className="ml-2 text-[hsl(var(--text-secondary))]">
                        / {billingInterval}
                      </span>
                    </div>

                    <ul className="space-y-4 mb-8" role="list">
                      {features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-[hsl(var(--text-secondary))]"
                          role="listitem"
                        >
                          <Check
                            className={cn(
                              'h-5 w-5 flex-shrink-0 mt-0.5',
                              isFeatured ? 'text-primary' : 'text-primary/70'
                            )}
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed">
                            {feature.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={isFeatured ? 'default' : 'outline'}
                      type="button"
                      onClick={() => handleStripeCheckout(price)}
                      disabled={priceIdLoading === price.id}
                      className={cn(
                        'w-full py-3 rounded-xl font-semibold transition-all duration-200',
                        isFeatured
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
                          : 'border-2 hover:bg-primary/10',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                      aria-label={`${subscription ? 'Manage' : 'Start with'} ${product.name} plan`}
                    >
                      {priceIdLoading === price.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : subscription ? (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Manage Subscription
                        </>
                      ) : (
                        <>
                          {isFeatured && <Zap className="mr-2 h-4 w-4" />}
                          Get Started
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div
            className="mt-16 text-center animate-fade-in"
            style={{ animationDelay: '600ms' }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by 10,000+ professionals
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="font-semibold">256-bit encryption</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="font-semibold">GDPR compliant</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="font-semibold">Cancel anytime</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
