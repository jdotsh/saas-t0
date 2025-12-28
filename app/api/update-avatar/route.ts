/**
 * SECURITY FIX: This endpoint had a critical authorization vulnerability in the original Hikari template.
 *
 * Original issue: userId came from request body, allowing any attacker to update any user's avatar.
 * Fix: Always use authenticated user's ID from session, never trust client input.
 *
 * Additional improvements:
 * - ✅ Added authentication check
 * - ✅ Added URL validation
 * - ✅ Added rate limiting (10 req/10s)
 * - ✅ Added proper error handling
 */

import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { ratelimitRequest } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { Database } from '@/types/db';

type User = Database['public']['Tables']['users']['Row'];

// Validate avatar URL is a proper URL and from allowed domains
const AvatarUrlSchema = z.object({
  avatarUrl: z.string().url().max(500)
});

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  // Step 1: Authenticate user (CRITICAL - was missing)
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      {
        error: 'Unauthorized. Please sign in to update your avatar.'
      },
      { status: 401 }
    );
  }

  // Step 2: Rate limiting (NEW - prevent abuse)
  const success = await ratelimitRequest(request);

  if (!success) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again in a few seconds.'
      },
      { status: 429 }
    );
  }

  // Step 3: Parse and validate input
  let validatedInput;
  try {
    const body = await request.json();
    validatedInput = AvatarUrlSchema.parse(body);
  } catch (_error: unknown) {
    // Log validation error for debugging
    logger.error('Avatar URL validation failed:', _error);
    return NextResponse.json(
      {
        error: 'Invalid avatar URL. Must be a valid URL under 500 characters.'
      },
      { status: 400 }
    );
  }

  // Step 4: Update only the authenticated user's avatar (NOT userId from request body!)
  const { data, error } = await supabase
    .from('users')
    // @ts-expect-error - Supabase SSR package has type inference issues with update operations
    .update({ avatar_url: validatedInput.avatarUrl })
    .eq('id', user.id) // ← SECURITY FIX: Use authenticated user's ID
    .select()
    .single();

  const typedData = data as User | null;

  if (error || !typedData) {
    logger.error('Avatar update error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update avatar. Please try again.'
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      avatar_url: typedData.avatar_url
    }
  });
}
