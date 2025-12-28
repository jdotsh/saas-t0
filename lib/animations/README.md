# Animation System Guide

Premium, production-ready animation system for a fast, responsive UI.

## Philosophy

**"Fast animations feel responsive. Invisible animations feel polished."**

- **Speed First**: Animations should complete in 100-200ms for micro-interactions
- **Physics-Based**: Use spring animations for natural, organic feel
- **Accessibility**: Always respect `prefers-reduced-motion`
- **GPU Acceleration**: Use `transform` and `opacity` for 60fps animations

## Quick Reference

### Tailwind Utilities

```tsx
// ✅ FAST - Micro-interactions (100-150ms)
<button className="transition-all duration-150 ease-snappy hover:scale-105 active:scale-98">
  Click me
</button>

// ✅ SMOOTH - Dropdowns, popovers (150-200ms)
<div className="transition-all duration-200 ease-smooth">
  Content
</div>

// ✅ SPRING - Playful bounce effect
<div className="transition-transform duration-200 ease-spring hover:-translate-y-1">
  Hover me
</div>

// ❌ TOO SLOW - Avoid duration-300 and above for interactive elements
<button className="transition-all duration-500"> // NO!
```

### Available Timing Functions

| Class         | Curve                               | Use Case                            |
| ------------- | ----------------------------------- | ----------------------------------- |
| `ease-snappy` | `cubic-bezier(0.4, 0, 0, 1)`        | Buttons, toggles, clicks            |
| `ease-smooth` | `cubic-bezier(0.32, 0.72, 0, 1)`    | Panels, menus, dropdowns            |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover effects, playful interactions |

### Available Durations

```
duration-50   → 50ms   - Ultra-fast (rare)
duration-100  → 100ms  - Fast micro-interactions
duration-150  → 150ms  - Standard interactions ⭐ (DEFAULT)
duration-200  → 200ms  - Modals, panels
duration-300  → 300ms  - Large transitions (use sparingly)
```

## Framer Motion

### Import Optimized Springs

```tsx
import { snappySpring, smoothSpring, bouncySpring } from '@/lib/animations/motion-tokens';

// Quick interactions (150ms)
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  transition={snappySpring}
/>

// Smooth panels (250ms)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={smoothSpring}
/>

// Playful bounce (350ms)
<motion.div
  whileHover={{ y: -5 }}
  transition={bouncySpring}
/>
```

### Stagger Animations

```tsx
import { stagger } from '@/lib/animations/motion-tokens';

<motion.ul
  variants={{
    visible: {
      transition: {
        ...stagger.normal // 50ms between items
      }
    }
  }}
>
  <motion.li variants={itemVariants} />
  <motion.li variants={itemVariants} />
</motion.ul>;
```

### Reduced Motion Support

```tsx
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { getTransition } from '@/lib/animations/motion-tokens';

function Component() {
  const prefersReducedMotion = useReducedMotion();
  const transition = getTransition(snappySpring, prefersReducedMotion);

  return <motion.div transition={transition} />;
}
```

## Built-in Animations

### Entrance Animations

```tsx
// Fade up from bottom
<div className="animate-fade-up">Content</div>

// Fade down from top
<div className="animate-fade-down">Content</div>

// Scale in (pop effect)
<div className="animate-scale-in">Content</div>

// Slide in from right
<div className="animate-slide-in-right">Content</div>
```

### Loading States

```tsx
// Pulse (slow, calm)
<div className="animate-pulse">Loading...</div>

// Pulse fast (energetic)
<div className="animate-pulse-fast">Loading...</div>

// Shimmer effect
<div className="animate-shimmer">Loading...</div>

// Spinner
<div className="animate-spin">⏳</div>
<div className="animate-spin-fast">⏳</div>
```

### Special Effects

```tsx
// Ripple effect
<div className="animate-ripple" />

// Gradient background
<div className="animate-gradient bg-gradient-to-r from-blue-500 to-purple-500" />
```

## Performance Best Practices

### ✅ DO

- Use `transform` and `opacity` (GPU-accelerated)
- Keep animations under 200ms for UI interactions
- Use `will-change` sparingly for complex animations
- Batch multiple properties in a single transition
- Test on low-end devices

```tsx
// ✅ Fast, GPU-accelerated
<div className="transition-transform duration-150 hover:scale-105" />

// ✅ Batched properties
<div className="transition-all duration-150 hover:scale-105 hover:opacity-90" />
```

### ❌ DON'T

- Animate `width`, `height`, `top`, `left` (causes layout reflow)
- Use duration > 300ms for buttons/toggles
- Stack multiple slow animations
- Animate many elements at once without throttling

```tsx
// ❌ Slow, causes reflow
<div className="transition-all duration-500 hover:w-full" />

// ❌ Too slow for a button
<button className="transition-colors duration-700" />
```

## Component-Specific Guidelines

### Buttons

- Duration: **100-150ms**
- Timing: `ease-snappy`
- Effects: Scale (0.98 on press), subtle lift on hover

### Dropdowns/Popovers

- Duration: **150-200ms**
- Timing: `ease-smooth`
- Effects: Fade + slide (10-20px)

### Modals/Dialogs

- Duration: **200-250ms**
- Timing: `smoothSpring`
- Effects: Scale in + fade, backdrop fade

### Navigation

- Duration: **200ms**
- Timing: `navSpring` (spring physics)
- Effects: Slide in, stagger menu items

### Toasts/Notifications

- Duration: **200ms**
- Timing: `ease-snappy`
- Effects: Slide from edge + fade

## Debugging Animations

```tsx
// Slow down all animations for debugging
document.documentElement.style.setProperty('--animation-speed', '10');
```

Add to your CSS:

```css
* {
  animation-duration: calc(var(--animation-speed, 1) * 1s) !important;
  transition-duration: calc(var(--animation-speed, 1) * 0.15s) !important;
}
```

## Examples from the Codebase

### Mobile Navigation

```tsx
// Fast stagger effect
import {
  mobileNavVariants,
  menuItemVariants
} from '@/lib/animations/nav-variants';

<motion.nav variants={mobileNavVariants} animate="open">
  {items.map((item) => (
    <motion.a variants={menuItemVariants}>{item}</motion.a>
  ))}
</motion.nav>;
```

### Button Interaction

```tsx
<Button className="hover:shadow-lg active:shadow-sm">
  // Automatic 150ms snappy transition
</Button>
```

### Card Hover

```tsx
<Card className="transition-all duration-150 ease-smooth hover:shadow-xl hover:-translate-y-1">
  Content
</Card>
```

---

**Remember**: The best animation is the one users don't notice. Keep it fast, keep it subtle.
