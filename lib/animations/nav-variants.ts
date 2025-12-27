/**
 * Mobile Navigation Animation Variants
 *
 * Centralized animation configurations for mobile navigation.
 * Uses Framer Motion for smooth, spring-based animations.
 */

import { Variants } from 'framer-motion';
import { navSpring, itemSpring, gentleSpring } from './spring-configs';

/**
 * Backdrop overlay animation
 * Fades in with blur effect
 */
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Mobile navigation panel animation
 * Slides in from right with spring physics
 * Includes stagger configuration for children (menu items)
 */
export const mobileNavVariants: Variants = {
  closed: {
    x: '100%',
    transition: {
      ...navSpring,
      staggerChildren: 0.05,
      staggerDirection: -1 // Reverse order on exit
    }
  },
  open: {
    x: 0,
    transition: {
      ...navSpring,
      staggerChildren: 0.07,
      delayChildren: 0.2 // Wait for panel to start sliding
    }
  }
};

/**
 * Individual menu item animation
 * Slides up and fades in
 * Used within stagger animation
 */
export const menuItemVariants: Variants = {
  closed: {
    y: 20,
    opacity: 0,
    transition: itemSpring
  },
  open: {
    y: 0,
    opacity: 1,
    transition: itemSpring
  }
};

/**
 * Menu item hover animation
 * Subtle lift with spring bounce
 */
export const menuItemHoverVariants = {
  hover: {
    y: -2,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98
  }
};

/**
 * Hamburger icon animation variants
 * For morphing ☰ → X
 */
export const hamburgerTopVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
    transition: { ...navSpring }
  },
  open: {
    rotate: 45,
    y: 6,
    transition: { ...navSpring }
  }
};

export const hamburgerMiddleVariants: Variants = {
  closed: {
    opacity: 1,
    transition: { duration: 0.1 }
  },
  open: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
};

export const hamburgerBottomVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
    transition: { ...navSpring }
  },
  open: {
    rotate: -45,
    y: -6,
    transition: { ...navSpring }
  }
};
