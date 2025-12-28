'use client';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
// import { cn } from '@/lib/utils'; // Removed - using direct classes for cleaner code
// import { buttonVariants } from '@/components/ui/button'; // Removed - using custom button styles
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="relative z-10 flex max-w-5xl flex-col items-center gap-8 md:gap-10 text-center mx-auto">
          {/* Premium Orange Announcement Badge */}
          <Link
            href={siteConfig.links.twitter}
            className="inline-flex transition-transform hover:scale-105 duration-200 ease-snappy cursor-pointer group bg-gradient-to-br from-white/10 to-white/5 rounded-full py-2 px-4 backdrop-blur-md gap-2.5 items-center border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl"
          >
            <span className="flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)] group-hover:shadow-[0_0_16px_rgba(249,115,22,0.8)] group-hover:animate-pulse"></span>
            <span className="text-sm font-semibold text-orange-50/90 tracking-tight group-hover:text-white transition-colors duration-200">
              New: Next.js 15 + Supabase Starter
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

          {/* Hero Title - Clean & Bold */}
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1] max-w-4xl">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Ship your SaaS
            </span>
            <br />
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              in{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 font-extrabold">
                days
              </span>
              , not months
            </span>
          </h1>

          {/* Subtitle - Clear Value Prop */}
          <p className="max-w-2xl text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground/90 leading-relaxed px-4">
            Production-ready Next.js 15 starter with auth, payments, and
            database.
            <br className="hidden sm:block" />
            Everything you need to launch fast.
          </p>

          {/* CTA Buttons - Clean & Modern */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full sm:w-auto px-4">
            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-200 ease-snappy hover:scale-105 active:scale-95"
            >
              Get Started Free
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-foreground bg-background/50 backdrop-blur-sm border-2 border-border/50 hover:border-border rounded-xl transition-all duration-200 ease-snappy hover:scale-105 hover:bg-background/80 active:scale-95"
            >
              View Pricing
            </Link>
          </div>

          {/* Social Proof - Minimal & Clean */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 w-full px-4">
            <div className="flex items-center gap-3">
              <AvatarCircles numPeople={155} avatarUrls={avatarUrls} />
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-yellow-400 text-yellow-400 size-4"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  160+ developers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
