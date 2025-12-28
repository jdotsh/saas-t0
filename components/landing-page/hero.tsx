'use client';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Particles from '@/components/magicui/particles';
import Ripple from '@/components/magicui/ripple';
// import AnimatedGradientText from '@/components/magicui/animated-shiny-text'; // Commented out with old badge
import { ArrowRightIcon } from '@radix-ui/react-icons';
import AvatarCircles from '@/components/magicui/avatar-circles';
import { useTheme } from 'next-themes';
// import { useState, useEffect } from 'react'; // Reserved for quote rotation feature
export default function HeroSection() {
  const { theme } = useTheme();
  const avatarUrls = [
    'https://avatars.githubusercontent.com/u/16860528',
    'https://avatars.githubusercontent.com/u/20110627',
    'https://avatars.githubusercontent.com/u/106103625',
    'https://avatars.githubusercontent.com/u/59228569'
  ];

  // Template: Quote testimonials for future use
  // const quotes = [
  //   {
  //     text: "That's beautiful bro!",
  //     author: 'dcodesdev',
  //     title: 'TypeScript Developer',
  //     avatarFallback: 'DC',
  //     avatarImg: '/images/dcodes.png'
  //   },
  //   {
  //     text: "If you've built this a few months ago, it would have saved me hours :D",
  //     author: 'SuhailKakar',
  //     title: 'Developer at joinOnboard',
  //     avatarFallback: 'SK',
  //     avatarImg: '/images/SuhailKakar.jpg'
  //   },
  //   {
  //     text: 'So cool, looks really clean. Any plan to open source it? ☺️ Wanna play with it!',
  //     author: 'SaidAitmbarek',
  //     title: 'Founder of microlaunch.net',
  //     avatarFallback: 'SA',
  //     avatarImg: '/images/said.jpg'
  //   }
  // ];

  // Template: Quote rotation logic - uncomment and add UI when needed
  // const [currentQuote, setCurrentQuote] = useState(0);
  //
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
  //   }, 5000); // Change quote every 5 seconds
  //
  //   return () => clearInterval(intervalId);
  // }, [quotes.length]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={300}
          ease={80}
          color={theme === 'dark' ? '#FFFFFF' : '#000000'}
          refresh
        />
        <Ripple />
      </div>
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-32">
        <div className="relative z-10 flex max-w-[64rem] flex-col items-center gap-6 md:gap-8 text-center mx-auto">
          {/* Premium Orange Announcement Badge - Fully Responsive */}
          <Link
            href={siteConfig.links.twitter}
            className="inline-flex transition-transform hover:scale-105 cursor-pointer group bg-gradient-to-br from-white/10 to-white/0 rounded-full pt-1.5 pr-3 pb-1.5 pl-3 backdrop-blur-sm gap-2 items-center border border-white/10"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:animate-pulse"></span>
            <span className="text-xs md:text-sm font-medium text-orange-100/80 tracking-wide group-hover:text-white transition-colors">
              New release: v2.0 with Next.js 15
            </span>
          </Link>

          {/* Commented out old badge - keeping for reference
          <Link href={siteConfig.links.twitter} className="w-fit">
            <div
              className={cn(
                'group rounded-full border border-black/5 bg-neutral-100 text-base text-secondary transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
              )}
            >
              <AnimatedGradientText className="inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{' '}
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#b76a24] via-[#6a24b7] to-[#b76a24] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  Follow the progress on X
                </span>
                <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </div>
          </Link>
          */}

          {/* Responsive Hero Title with Letter Animation */}
          <h1 className="font-heading tracking-tight font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2">
              <span className="inline-flex bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50">
                Scale
              </span>
              <span className="inline-flex bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50">
                your
              </span>
              <span className="inline-flex bg-clip-text text-transparent bg-gradient-to-b from-primary via-primary to-primary/60 font-extrabold">
                SaaS
              </span>
              <span className="inline-flex bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50">
                with
              </span>
              <span className="inline-flex bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50">
                Next.js
              </span>
            </span>
          </h1>
          {/* Responsive Subtitle */}
          <p className="max-w-[42rem] text-base md:text-lg lg:text-xl font-medium tracking-tight text-muted-foreground leading-relaxed px-4">
            Production-ready SaaS template with Next.js 15, Supabase, Stripe,
            and TypeScript. Ship faster with authentication, payments, and
            database ready to go.
          </p>

          {/* Responsive CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 w-full sm:w-auto px-4">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: 'xl' }),
                'w-full sm:w-auto rounded-full border-2 border-primary dark:border-white text-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 ease-snappy'
              )}
            >
              Start Free Trial <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#pricing"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'xl' }),
                'w-full sm:w-auto rounded-full border-2 border-primary dark:border-white text-semibold transition-all duration-200 ease-snappy'
              )}
            >
              See Pricing
            </Link>
          </div>

          {/* Responsive Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-4 w-full px-4">
            <AvatarCircles numPeople={155} avatarUrls={avatarUrls} />
            <div className="flex flex-col mt-2">
              <div className="flex flex-row justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-yellow-200 text-yellow-300 size-5"
                  />
                ))}
              </div>
              <span className="text-xs font-semibold">
                Join 160+ developers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
