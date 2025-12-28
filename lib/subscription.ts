import { freePlan, proPlan } from '@/config/subscriptions';
import { createClient } from '@/utils/supabase/server';
import { UserSubscriptionPlan } from '../types';

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const supabase = createClient();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch subscription: ${error.message}`);
  }

  const isPro =
    subscription?.status === 'active' &&
    subscription?.price_id &&
    new Date(subscription.current_period_end).getTime() > Date.now();

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    stripe_subscription_id: subscription?.id,
    stripe_customer_id: subscription?.user_id,
    stripe_price_id: subscription?.price_id,
    stripe_current_period_end: subscription?.current_period_end
      ? new Date(subscription.current_period_end).getTime()
      : undefined,
    isPro
  };
}
