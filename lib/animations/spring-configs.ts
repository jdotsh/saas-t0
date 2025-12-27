/**
 * Spring Animation Configurations
 *
 * Reusable spring physics for consistent animations across the app.
 * Based on industry best practices and competitor analysis.
 */

import { Transition } from 'framer-motion';

/**
 * Quick, snappy spring - for buttons, toggles, small interactions
 * High stiffness, low damping = fast, responsive feel
 */
export const snappySpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30
};

/**
 * Smooth, natural spring - for panels, menus, larger movements
 * Medium stiffness, medium damping = balanced, professional feel
 */
export const smoothSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 24
};

/**
 * Bouncy, playful spring - for hover effects, micro-interactions
 * High stiffness, medium-high damping, bounce = energetic feel
 */
export const bouncySpring: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 40,
  bounce: 0.7
};

/**
 * Gentle, slow spring - for backdrops, large overlays
 * Low stiffness, low damping = calm, gradual feel
 */
export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20
};

/**
 * Navigation-specific spring - optimized for mobile menu panel
 */
export const navSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 24
};

/**
 * Menu item spring - optimized for staggered list items
 */
export const itemSpring: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 40
};
