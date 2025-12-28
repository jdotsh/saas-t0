'use client';
import { useEffect, useState } from 'react';
import {
  StripeSvg,
  NextjsSvg,
  SupabaseSvg,
  VercelSvg,
  GithubSvg,
  LogoSupacrawler
} from '@/components/svg';

export default function LogoCloud() {
  const [primaryColor, setPrimaryColor] = useState('');

  useEffect(() => {
    // Get the computed style of the primary color
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColorValue = rootStyles.getPropertyValue('--primary');
    setPrimaryColor(primaryColorValue.trim());
  }, []);

  const logos = [
    { Svg: NextjsSvg, href: 'https://nextjs.org', label: 'Next.js' },
    { Svg: VercelSvg, href: 'https://vercel.com', label: 'Vercel' },
    { Svg: StripeSvg, href: 'https://stripe.com', label: 'Stripe' },
    { Svg: SupabaseSvg, href: 'https://supabase.io', label: 'Supabase' },
    { Svg: GithubSvg, href: 'https://github.com', label: 'GitHub' }
  ];

  return (
    <div className="w-full py-12">
      <p className="text-xs uppercase text-muted-foreground text-center font-semibold tracking-[0.3em] mb-8">
        Trusted by the modern web3 ecosystem
      </p>

      {/* Scrolling container with mask */}
      <div className="relative overflow-hidden">
        {/* Gradient masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling logos - normalized sizes, faster left-scroll animation */}
        <div
          className="flex gap-12 md:gap-16 animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: '25s' }}
        >
          {/* First set of logos */}
          {logos.map(({ Svg, href, label }) => (
            <div
              key={`${label}-1`}
              className="flex items-center justify-center h-12 w-24 md:h-14 md:w-28 flex-shrink-0"
            >
              <a
                href={href}
                aria-label={`${label} Link`}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-smooth w-full h-full flex items-center justify-center"
              >
                <Svg
                  className="h-8 w-auto md:h-10 object-contain"
                  style={{ color: primaryColor }}
                />
              </a>
            </div>
          ))}

          {/* Supacrawler logo */}
          <div
            key="supacrawler-1"
            className="flex items-center justify-center h-12 w-24 md:h-14 md:w-28 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-smooth"
          >
            <div className="h-8 w-auto md:h-10 flex items-center justify-center">
              <LogoSupacrawler />
            </div>
          </div>

          {/* Duplicate set for seamless loop */}
          {logos.map(({ Svg, href, label }) => (
            <div
              key={`${label}-2`}
              className="flex items-center justify-center h-12 w-24 md:h-14 md:w-28 flex-shrink-0"
            >
              <a
                href={href}
                aria-label={`${label} Link`}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-smooth w-full h-full flex items-center justify-center"
              >
                <Svg
                  className="h-8 w-auto md:h-10 object-contain"
                  style={{ color: primaryColor }}
                />
              </a>
            </div>
          ))}

          {/* Duplicate Supacrawler */}
          <div
            key="supacrawler-2"
            className="flex items-center justify-center h-12 w-24 md:h-14 md:w-28 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-smooth"
          >
            <div className="h-8 w-auto md:h-10 flex items-center justify-center">
              <LogoSupacrawler />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
