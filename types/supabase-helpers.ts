import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './db';

export type TypedSupabaseClient = SupabaseClient<Database>;
