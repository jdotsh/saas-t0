import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
process.env.STRIPE_SECRET_KEY = 'sk_test_test';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_test';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn()
}));

// Mock Supabase client
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(),
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn()
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(),
        eq: vi.fn()
      })),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }))
  }))
}));
