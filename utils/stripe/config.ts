import Stripe from 'stripe';
import { env } from '@/env.mjs';

const stripeKey = env.STRIPE_API_KEY || '';

if (!stripeKey && process.env.NODE_ENV === 'production') {
  console.warn(
    'WARNING: STRIPE_API_KEY is not set. Stripe functionality will not work.'
  );
}

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-11-20.acacia' as Stripe.LatestApiVersion,
  appInfo: {
    name: 'Nexus SaaS Template',
    version: '1.0.0'
  }
});
