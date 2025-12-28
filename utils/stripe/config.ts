import Stripe from 'stripe';
import { env } from '@/env.mjs';

const stripeKey = env.STRIPE_API_KEY || '';

// Validate Stripe configuration
if (!stripeKey) {
  const errorMsg = 'STRIPE_API_KEY is required for Stripe functionality';

  if (
    process.env.NODE_ENV === 'production' &&
    process.env.VERCEL_ENV === 'production'
  ) {
    // In production deployment, log error but don't crash the build
    console.error(`❌ ${errorMsg}`);
    console.error('⚠️  Payment features will be unavailable until configured');
  } else if (process.env.NODE_ENV === 'production') {
    // In build/preview, warn but allow build to continue
    console.warn(`⚠️  ${errorMsg}`);
  }
}

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-11-20.acacia' as Stripe.LatestApiVersion,
  appInfo: {
    name: 'Nexus SaaS Template',
    version: '1.0.0'
  }
});
