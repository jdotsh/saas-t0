import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/config';
import { logger } from '@/lib/logger';
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
  deleteProductRecord,
  deletePriceRecord
} from '@/utils/supabase/admin';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'product.deleted',
  'price.created',
  'price.updated',
  'price.deleted',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export async function POST(req: Request) {
  logger.info('Received a request');
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      logger.info('Webhook secret not found');
      return new Response('Webhook secret not found.', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    logger.info(`🔔  Webhook received: ${event.type}`);
  } catch (err: unknown) {
    logger.info(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    logger.info(`Processing relevant event: ${event.type}`);
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          logger.info(`Handling product event: ${event.type}`);
          await upsertProductRecord(event.data.object as Stripe.Product);
          logger.info(`Product event handled: ${event.type}`);
          break;
        case 'price.created':
        case 'price.updated':
          logger.info(`Handling price event: ${event.type}`);
          await upsertPriceRecord(event.data.object as Stripe.Price);
          logger.info(`Price event handled: ${event.type}`);
          break;
        case 'price.deleted':
          logger.info(`Handling price deleted event`);
          await deletePriceRecord(event.data.object as Stripe.Price);
          logger.info(`Price deleted event handled`);
          break;
        case 'product.deleted':
          logger.info(`Handling product deleted event`);
          await deleteProductRecord(event.data.object as Stripe.Product);
          logger.info(`Product deleted event handled`);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          logger.info(`Handling subscription event: ${event.type}`);
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === 'customer.subscription.created'
          );
          logger.info(`Subscription event handled: ${event.type}`);
          break;
        case 'checkout.session.completed':
          logger.info('Handling checkout session completed event');
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true
            );
          }
          logger.info('Checkout session completed event handled');
          break;
        case 'invoice.payment_succeeded':
          const invoice = event.data.object as Stripe.Invoice;

          logger.info('Invoice', invoice);
          logger.info('Invoice subscripton reason', invoice.billing_reason);

          if (invoice.billing_reason === 'subscription_cycle') {
            // Subscription cycle payment - could be used for resetting usage limits
            const _subscriptionId = invoice.subscription;
            const _customerId = invoice.customer;

            logger.info('It is subscription cycle.');

            logger.info(`Successfully reset questions_counter for user `);
          }
          break;
        default:
          logger.info('Unhandled relevant event type!');
          throw new Error('Unhandled relevant event!');
      }
    } catch (error: unknown) {
      logger.info(`Error handling event: ${event.type}`, error);
      return new Response(
        'Webhook handler failed. View your Next.js function logs.',
        {
          status: 400
        }
      );
    }
  } else {
    logger.info(`Unsupported event type: ${event.type}`);
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400
    });
  }
  logger.info('Event processed successfully');
  return new Response(JSON.stringify({ received: true }));
}
