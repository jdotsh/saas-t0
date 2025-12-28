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
import { Moon, Check, Loader2 } from 'lucide-react';
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4">
            Flat pricing, no management fees.
          </h1>
          <p className="mt-2 sm:mt-3 text-center text-sm sm:text-base text-muted-foreground max-w-3xl px-4">
            Whether you're one person trying to get ahead or a big firm trying
            to take over the world, we've got a plan for you.
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
          <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-3 sm:gap-4 w-full max-w-md sm:max-w-none px-4">
            <Button
              className="rounded-4xl w-full sm:w-auto px-6 sm:px-8"
              variant={billingInterval === 'month' ? 'default' : 'outline'}
              onClick={() => setBillingInterval('month')}
            >
              Monthly
            </Button>
            <Button
              className="rounded-4xl w-full sm:w-auto px-6 sm:px-8"
              variant={billingInterval === 'year' ? 'default' : 'outline'}
              onClick={() => setBillingInterval('year')}
            >
              Yearly
            </Button>
          </div>
          <div className="grid gap-6 sm:gap-8 mt-8 sm:mt-10 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
            {displayProducts.map((product) => {
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
              const cardBgColor = isActive
                ? 'border-black bg-white text-black'
                : 'bg-white text-black';

              // Use features from the pricingPlans config
              const plan = pricingPlans.find(
                (plan) => plan.name === product.name
              );
              const features = plan ? plan.features : [];

              return (
                <Card
                  key={product.id}
                  className={`w-full max-w-sm mx-auto rounded-3xl sm:rounded-4xl border-2 ${cardBgColor}`}
                >
                  <CardHeader className="rounded-t-3xl sm:rounded-t-4xl flex flex-col justify-center p-4 sm:p-6">
                    <div className="flex items-center">
                      <Moon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600 fill-zinc-500" />
                      <CardTitle className="ml-2 text-xl sm:text-2xl font-bold">
                        {product.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-3xl sm:text-4xl font-bold py-6 sm:py-8">
                      {priceString}
                    </div>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                      {product.description}
                    </p>
                    <Button
                      variant="default"
                      type="button"
                      onClick={() => handleStripeCheckout(price)}
                      disabled={priceIdLoading === price.id}
                      className="mt-4 w-full rounded-3xl sm:rounded-4xl py-2 sm:py-2.5 text-sm sm:text-base"
                    >
                      {priceIdLoading === price.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : subscription ? (
                        'Manage'
                      ) : (
                        'Subscribe'
                      )}
                    </Button>
                    <ul className="mt-4 space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="text-blue-500 h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                          <span className="text-xs sm:text-sm">
                            {feature.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
