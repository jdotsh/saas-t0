import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ratelimitRequest } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  // Check if the user is authenticated
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limiting (prevent abuse)
  const success = await ratelimitRequest(req);

  if (!success) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again in a few seconds.'
      },
      { status: 429 }
    );
  }

  // Fetch teams for the authenticated user
  const { data: teams, error } = await supabase
    .from('team_members')
    .select(
      `
      team_id,
      role,
      teams:team_id (
        id,
        name,
        created_at,
        updated_at
      )
    `
    )
    .eq('user_id', user.id);

  if (error) {
    logger.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }

  // Transform the data to a more convenient format
  const formattedTeams = teams.map(({ teams, role }) => ({
    ...teams,
    role
  }));

  return NextResponse.json(formattedTeams);
}
