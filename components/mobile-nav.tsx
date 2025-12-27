// components/mobile-nav.tsx

'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MainNavItem } from 'types';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { useLockBody } from '@/hooks/use-lock-body';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import {
  backdropVariants,
  mobileNavVariants,
  menuItemVariants,
  menuItemHoverVariants
} from '@/lib/animations/nav-variants';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
  user?: boolean;
  onClose?: () => void;
}

export function MobileNav({ items, children, user, onClose }: MobileNavProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Lock body scroll when menu is open
  useLockBody();

  // Close menu when clicking outside
  useClickOutside(menuRef, () => {
    onClose?.();
  });

  // Close menu when pressing Escape key
  useEscapeKey(() => {
    onClose?.();
  });

  const handleLinkClick = () => {
    onClose?.();
  };

  return (
    <>
      {/* Animated backdrop overlay */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={shouldReduceMotion ? undefined : backdropVariants}
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden"
        onClick={onClose}
      />

      {/* Animated mobile menu panel */}
      <motion.div
        ref={menuRef}
        initial="closed"
        animate="open"
        exit="closed"
        variants={shouldReduceMotion ? undefined : mobileNavVariants}
        className={cn(
          'fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-md',
          'grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto',
          'rounded-lg p-6 pb-32 shadow-xl md:hidden'
        )}
      >
        <div className="grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
          {/* Logo */}
          <motion.div
            variants={shouldReduceMotion ? undefined : menuItemVariants}
          >
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={handleLinkClick}
            >
              <Icons.Eclipse />
              <span className="font-bold">Nexus</span>
            </Link>
          </motion.div>

          {/* Navigation items with stagger animation */}
          <nav className="grid grid-flow-row auto-rows-max text-sm">
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? undefined : menuItemVariants}
                whileHover={
                  shouldReduceMotion || item.disabled
                    ? undefined
                    : menuItemHoverVariants.hover
                }
                whileTap={
                  shouldReduceMotion || item.disabled
                    ? undefined
                    : menuItemHoverVariants.tap
                }
              >
                <Link
                  href={item.disabled ? '#' : item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    'flex w-full items-center rounded-md p-3 text-sm font-medium',
                    'hover:bg-accent hover:text-accent-foreground',
                    'transition-colors duration-200',
                    item.disabled && 'cursor-not-allowed opacity-60'
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <motion.div
            variants={shouldReduceMotion ? undefined : menuItemVariants}
            className="flex items-center space-x-2 mt-4"
          >
            <ModeToggle />
            <Link
              href={user ? '/dashboard' : '/signin'}
              onClick={handleLinkClick}
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'px-4'
              )}
            >
              {user ? 'Dashboard' : 'Login'}
            </Link>
          </motion.div>

          {children}
        </div>
      </motion.div>
    </>
  );
}
