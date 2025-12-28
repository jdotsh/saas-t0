import { createClient } from '@/utils/supabase/server';
import { getUser, getUserDetails } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createClient();
  const [user, _userDetails] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase) // Template: use for user-specific features
  ]);

  if (!user) {
    return redirect('/signin');
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 gap-4">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard, {user.email}!
        </p>
      </div>
    </div>
  );
}
