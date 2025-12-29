'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card-header';
import type { Tables } from '@/types/db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import pricingPlans from '@/config/pricing';
import { dummyPricing } from '@/config/pricing';

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
  // Removed unused: intervals
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
      <section className="container mx-auto" id="pricing">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
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
      <section className="container mx-auto px-4 sm:px-6" id="pricing">
        <div className="flex flex-col items-center justify-center w-full min-h-screen py-12 sm:py-16 md:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center px-3 sm:px-4 tracking-tight">
            Choose your plan
          </h1>
          <p className="mt-3 sm:mt-4 text-center text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl px-3 sm:px-4">
            Start free, upgrade when you're ready. All plans include 14-day
            trial.
          </p>
          {displayProducts.length === 0 && (
            <p className="mt-4 text-center text-xs sm:text-sm text-red-500 px-4 max-w-2xl">
              Note: This is dummy pricing data. Please add your own pricing data
              in the Stripe Dashboard to see actual plans. Alternatively, you
              may use the Stripe Fixtures command to create your own pricing
              data, see{' '}
              <a
                href="https://hikari.antoineross.com/docs/configure/stripe/local"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                documentation
              </a>
              .
            </p>
          )}
          <div className="flex items-center justify-center mt-8 gap-2 bg-muted/50 p-1 rounded-full w-fit mx-auto">
            <Button
              className="px-6 py-2 rounded-full transition-all duration-200"
              variant={billingInterval === 'month' ? 'default' : 'ghost'}
              onClick={() => setBillingInterval('month')}
            >
              Monthly
            </Button>
            <Button
              className="px-6 py-2 rounded-full transition-all duration-200"
              variant={billingInterval === 'year' ? 'default' : 'ghost'}
              onClick={() => setBillingInterval('year')}
            >
              Yearly
              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </Button>
          </div>
          <div className="grid gap-6 sm:gap-8 mt-10 md:mt-12 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
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

              const cardBgColor = isFeatured
                ? 'bg-gradient-to-br from-primary to-primary/80 text-white border-primary'
                : isActive
                  ? 'bg-background/80 backdrop-blur-xl border-primary'
                  : 'bg-background/80 backdrop-blur-xl border-border';

              // Use features from the pricingPlans config
              const plan = pricingPlans.find(
                (plan) => plan.name === product.name
              );
              const features = plan ? plan.features : [];

              return (
                <Card
                  key={product.id}
                  className={`relative w-full rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl ${cardBgColor} ${
                    isFeatured
                      ? 'md:scale-105 md:z-10 shadow-2xl'
                      : 'hover:scale-[1.02]'
                  }`}
                >
                  {/* Most Popular Badge */}
                  {isFeatured && (
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold text-white">
                      MOST POPULAR
                    </div>
                  )}

                  <CardHeader className="p-0 pb-6">
                    <CardTitle
                      className={`text-2xl font-semibold mb-2 ${isFeatured ? 'text-white' : 'text-foreground'}`}
                    >
                      {product.name}
                    </CardTitle>
                    <p
                      className={`text-sm ${isFeatured ? 'text-white/80' : 'text-muted-foreground'}`}
                    >
                      {product.name === 'Free'
                        ? 'Perfect to get started'
                        : product.name === 'Pro'
                          ? 'For power users'
                          : 'For teams & organizations'}
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="mb-8">
                      <span
                        className={`text-5xl font-bold ${isFeatured ? 'text-white' : 'text-foreground'}`}
                      >
                        {priceString.replace(/\.\d+$/, '')}
                      </span>
                      <span
                        className={`ml-2 ${isFeatured ? 'text-white/80' : 'text-muted-foreground'}`}
                      >
                        / {billingInterval}
                      </span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check
                            className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isFeatured ? 'text-white' : 'text-primary'}`}
                          />
                          <span
                            className={`text-sm ${isFeatured ? 'text-white' : 'text-foreground'}`}
                          >
                            {feature.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={isFeatured ? 'secondary' : 'default'}
                      type="button"
                      onClick={() => handleStripeCheckout(price)}
                      disabled={priceIdLoading === price.id}
                      className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                        isFeatured
                          ? 'bg-white text-primary hover:bg-white/90'
                          : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}
                    >
                      {priceIdLoading === price.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : subscription ? (
                        'Manage Subscription'
                      ) : (
                        'Get Started'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by 10,000+ professionals
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold">256-bit encryption</span>
              <span>•</span>
              <span className="font-semibold">GDPR compliant</span>
              <span>•</span>
              <span className="font-semibold">Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
