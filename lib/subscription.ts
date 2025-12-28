import { freePlan, proPlan } from '@/config/subscriptions';
import { createClient } from '@/utils/supabase/server';
import { UserSubscriptionPlan } from '../types';
import { Database } from '@/types/db';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch subscription: ${error.message}`);
  }

  const subscription = data as Subscription | null;

  const isPro = Boolean(
    subscription?.status === 'active' &&
    subscription?.price_id &&
    new Date(subscription.current_period_end).getTime() > Date.now()
  );

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    stripe_subscription_id: subscription?.id ?? null,
    stripe_customer_id: subscription?.user_id ?? null,
    stripe_price_id: subscription?.price_id ?? null,
    stripe_current_period_end: subscription?.current_period_end
      ? new Date(subscription.current_period_end).getTime()
      : null,
    isPro
  };
}
