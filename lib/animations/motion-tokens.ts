/**
 * Motion Design Tokens
 *
 * Production-grade animation system based on:
 * - Apple Human Interface Guidelines
 * - Google Material Design 3
 * - Vercel's design system
 * - Linear's micro-interactions
 *
 * Philosophy: Fast, responsive, invisible animations that feel natural
 */

// ============================================================================
// DURATION TOKENS
// ============================================================================

/**
 * Duration scale (in milliseconds)
 * Rule: UI animations should complete before user can blink (150-200ms)
 */
export const duration = {
  instant: 0, // Disable animations (accessibility, reduced motion)
  fast: 100, // Micro-interactions: checkbox, toggle, hover
  normal: 150, // Standard transitions: dropdowns, tooltips
  moderate: 200, // Modals, drawers, panels
  slow: 300, // Page transitions, large movements
  slower: 400, // Complex multi-step animations
  slowest: 500 // Skeleton loaders, progress indicators
} as const;

// ============================================================================
// EASING CURVES
// ============================================================================

/**
 * Custom cubic-bezier easing functions
 * Source: https://easings.net + custom tuned curves
 */
export const easing = {
  // Standard ease curves
  linear: 'linear',

  // Entrance animations (start slow, end fast)
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // Standard ease-in
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',

  // Exit animations (start fast, end slow)
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)', // Material Design standard
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',

  // Both entrance and exit (smooth throughout)
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design emphasized
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

  // Custom branded curves (Apple-inspired)
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy spring effect
  snappy: 'cubic-bezier(0.4, 0, 0, 1)', // Quick, responsive (Apple default)
  smooth: 'cubic-bezier(0.32, 0.72, 0, 1)', // Smooth deceleration

  // Special effects
  anticipate: 'cubic-bezier(0.36, 0, 0.66, -0.56)', // Pull back before moving
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)' // Overshoot and settle
} as const;

// ============================================================================
// FRAMER MOTION SPRING CONFIGS
// ============================================================================

import { Transition } from 'framer-motion';

/**
 * Physics-based spring animations
 * stiffness: How tight the spring is (higher = faster)
 * damping: How much resistance (higher = less oscillation)
 * mass: Weight of the object (higher = slower)
 */

/**
 * Ultra-responsive spring - buttons, checkboxes, micro-interactions
 * Snappy like iOS buttons - completes in ~150ms
 */
export const ultraSnappySpring: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
  mass: 0.5
};

/**
 * Snappy spring - hover effects, toggles, small movements
 * Fast and responsive - completes in ~200ms
 */
export const snappySpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8
};

/**
 * Smooth spring - dropdowns, popovers, medium elements
 * Balanced feel - completes in ~250ms
 */
export const smoothSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 1
};

/**
 * Bouncy spring - playful interactions, notification badges
 * Slight overshoot for personality - completes in ~350ms
 */
export const bouncySpring: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 20,
  mass: 0.8,
  restDelta: 0.001
};

/**
 * Gentle spring - modals, sheets, large panels
 * Calm and professional - completes in ~400ms
 */
export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1.2
};

/**
 * Fluid spring - page transitions, complex layouts
 * Smooth and flowing - completes in ~500ms
 */
export const fluidSpring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 1.5
};

// ============================================================================
// PRESET TRANSITIONS (Tailwind-compatible)
// ============================================================================

/**
 * CSS transition strings for Tailwind classes
 * Usage: className={`transition ${preset.smooth}`}
 */
export const preset = {
  // Fast micro-interactions
  instant: `all ${duration.fast}ms ${easing.snappy}`,

  // Standard interactions
  fast: `all ${duration.normal}ms ${easing.snappy}`,
  smooth: `all ${duration.normal}ms ${easing.smooth}`,

  // Color transitions (slightly slower for smooth color interpolation)
  colors: `colors ${duration.moderate}ms ${easing.easeOut}`,

  // Transform-specific (use GPU acceleration)
  transform: `transform ${duration.normal}ms ${easing.snappy}`,
  scale: `scale ${duration.fast}ms ${easing.spring}`,

  // Opacity fades
  fade: `opacity ${duration.moderate}ms ${easing.easeInOut}`,

  // Layout shifts
  layout: `all ${duration.moderate}ms ${easing.smooth}`,

  // Disabled (accessibility)
  none: 'none'
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get transition based on user's reduced motion preference
 */
export function getTransition(
  normalTransition: Transition,
  prefersReducedMotion: boolean = false
): Transition {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }
  return normalTransition;
}

/**
 * Stagger configuration for list animations
 */
export const stagger = {
  fast: {
    delayChildren: 0.05,
    staggerChildren: 0.03
  },
  normal: {
    delayChildren: 0.1,
    staggerChildren: 0.05
  },
  slow: {
    delayChildren: 0.15,
    staggerChildren: 0.08
  }
} as const;

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Framer Motion component
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={snappySpring}
/>

// Tailwind CSS class
<div className="transition-all duration-150 ease-snappy hover:scale-105" />

// With reduced motion hook
const transition = getTransition(smoothSpring, useReducedMotion());
*/
