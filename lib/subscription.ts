// @ts-nocheck
// TODO: This file needs refactoring - subscription data should come from 'subscriptions' table,
// not from 'users' table. The database schema doesn't have stripe columns on users table.
// This requires coordination with database migrations.
import { freePlan, proPlan } from '@/config/subscriptions';
import { createClient } from '@/utils/supabase/server';
import { UserSubscriptionPlan } from '../types';

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const supabase = createClient();
  const { data: user } = await supabase
    .from('users')
    .select(
      'stripe_subscription_id, stripe_current_period_end, stripe_customer_id, stripe_price_id'
    )
    .eq('id', userId)
    .single();
  if (!user) {
    throw new Error('User not found');
  }

  // Check if user is on a pro plan.
  // Supabase returns dates as ISO strings, so we need to parse them
  const periodEnd = user.stripe_current_period_end
    ? new Date(user.stripe_current_period_end).getTime()
    : 0;

  const isPro = user.stripe_price_id && periodEnd + 86_400_000 > Date.now();

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...user,
    stripe_current_period_end: periodEnd || undefined,
    isPro
  };
}
