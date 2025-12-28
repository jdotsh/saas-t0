/**
 * Spring Animation Configurations
 *
 * DEPRECATED: Use motion-tokens.ts instead
 * Keeping for backward compatibility
 */

import { Transition } from 'framer-motion';

/**
 * Quick, snappy spring - for buttons, toggles, small interactions
 * High stiffness, low damping = fast, responsive feel
 * OPTIMIZED: Faster response, completes in ~150ms
 */
export const snappySpring: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
  mass: 0.5
};

/**
 * Smooth, natural spring - for panels, menus, larger movements
 * Medium stiffness, medium damping = balanced, professional feel
 * OPTIMIZED: Better damping ratio, completes in ~250ms
 */
export const smoothSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 1
};

/**
 * Bouncy, playful spring - for hover effects, micro-interactions
 * High stiffness, medium-high damping, bounce = energetic feel
 * OPTIMIZED: Reduced damping for more personality
 */
export const bouncySpring: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 20,
  mass: 0.8,
  restDelta: 0.001
};

/**
 * Gentle, slow spring - for backdrops, large overlays
 * Low stiffness, low damping = calm, gradual feel
 * OPTIMIZED: Better mass for larger elements
 */
export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1.2
};

/**
 * Navigation-specific spring - optimized for mobile menu panel
 * OPTIMIZED: Faster, more responsive feel
 */
export const navSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8
};

/**
 * Menu item spring - optimized for staggered list items
 * OPTIMIZED: Snappier for better stagger effect
 */
export const itemSpring: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
  mass: 0.5
};
