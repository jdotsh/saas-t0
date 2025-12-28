import Stripe from 'stripe';
import { env } from '@/env.mjs';

const stripeKey = env.STRIPE_API_KEY;

if (!stripeKey) {
  throw new Error('STRIPE_API_KEY is required');
}

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-11-20.acacia' as Stripe.LatestApiVersion,
  appInfo: {
    name: 'Nexus SaaS Template',
    version: '1.0.0'
  }
});
