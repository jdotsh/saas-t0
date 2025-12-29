'use client';

import * as React from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { MainNavItem } from 'types';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/mobile-nav';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { SunIcon } from '@heroicons/react/24/solid';

interface CircularNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  user?: boolean;
}

export default function CircularNavigation({
  items,
  children,
  user
}: CircularNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <>
      <div className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between w-full py-4">
            <Link href="/" className="flex items-center space-x-2 z-10">
              <div className="bg-primary/10 dark:bg-primary/20 p-1.5 rounded-full">
                <SunIcon className="size-6 md:size-8 text-primary transition-transform duration-300 ease-in-out hover:scale-110" />
              </div>
              <span className="text-base md:text-xl font-extrabold tracking-tight">
                NEXUS
              </span>
            </Link>

            {/* Desktop Navigation */}
            {items?.length ? (
              <div className="hidden md:flex space-x-6">
                {items?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? '#' : item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      'text-foreground/70 hover:text-foreground',
                      item.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <ModeToggle />

              {/* For logged-out users: Login + Get Started */}
              {!user && (
                <>
                  <Link
                    href="/signin"
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'sm' }),
                      'px-5 text-sm font-medium'
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className={cn(
                      buttonVariants({ variant: 'default', size: 'sm' }),
                      'px-5 text-sm font-semibold'
                    )}
                  >
                    Get Started
                  </Link>
                </>
              )}

              {/* For logged-in users: Dashboard */}
              {user && (
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'sm' }),
                    'px-5 text-sm font-semibold'
                  )}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                'md:hidden flex items-center justify-center',
                'p-2 rounded-md transition-colors z-10',
                'hover:bg-accent active:bg-accent/80'
              )}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle mobile menu"
              aria-expanded={showMobileMenu}
            >
              {showMobileMenu ? (
                <Icons.close className="h-6 w-6" />
              ) : (
                <Icons.Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Panel with exit animations */}
      <AnimatePresence mode="wait">
        {showMobileMenu && items && (
          <MobileNav
            items={items}
            user={user}
            onClose={() => setShowMobileMenu(false)}
          >
            {children}
          </MobileNav>
        )}
      </AnimatePresence>
    </>
  );
}
