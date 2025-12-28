import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Update Supabase session
  const response = await updateSession(request);

  // Add current path header
  response.headers.set('x-current-path', request.nextUrl.pathname);

  // Security Headers
  // Prevent clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy (restrict browser features)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  // Content Security Policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://checkout.stripe.com https://vercel.live;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://avatars.githubusercontent.com https://*.supabase.co https://lh3.googleusercontent.com;
    font-src 'self' data:;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://checkout.stripe.com https://vercel.live;
    frame-src 'self' https://js.stripe.com https://checkout.stripe.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // Strict Transport Security (HSTS) - only on production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
