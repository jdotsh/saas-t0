# Supabase Cloud Setup Guide

## 1. Create Supabase Project

1. Go to https://supabase.com
2. Sign in or create account
3. Click "New Project"
4. Fill in:
   - Project name: `nexus-saas` (or your preference)
   - Database password: (save this securely)
   - Region: Choose closest to your users
   - Plan: Free tier is fine for development

## 2. Get Your Credentials

Once project is created, go to Settings > API:

- **Project URL**: `https://[YOUR-PROJECT-REF].supabase.co`
- **Anon/Public Key**: `eyJhbGc...` (long string)
- **Service Role Key**: `eyJhbGc...` (different long string)

## 3. Update Environment Variables

Copy `.env.local.example` to `.env.local` and update:

```bash
# Replace with your Supabase Cloud credentials
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

## 4. Link Local Project to Cloud

```bash
# Login to Supabase
supabase login

# Link to your cloud project
supabase link --project-ref [YOUR-PROJECT-REF]
```

## 5. Push Database Schema

```bash
# Push your local migrations to cloud
supabase db push
```

## 6. (Optional) Set up GitHub Actions

For automatic deployments, add these secrets to GitHub:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_ID`
- `SUPABASE_DB_PASSWORD`

## Database Schema

The project includes these tables:

- `users` - User profiles
- `customers` - Stripe customer data
- `prices` - Product pricing
- `products` - Product catalog
- `subscriptions` - Active subscriptions
- `user_email_list` - Newsletter signups

## Test Connection

Run the development server:

```bash
pnpm dev
```

Visit http://localhost:3000 and try signing up!

## Troubleshooting

- **Auth not working**: Check redirect URLs in Supabase Dashboard > Authentication > URL Configuration
- **Database errors**: Run `supabase db reset` to recreate schema
- **Connection refused**: Ensure you're using cloud URLs, not local (127.0.0.1)
