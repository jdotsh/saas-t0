const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './dist/*.{html,js}'
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    containerHeader: {
      center: true,
      padding: '3rem',
      screens: {
        '2xl': '1400px'
      }
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
      widest: '.25em'
    },
    extend: {
      spacing: {
        128: '32rem'
      },
      backgroundImage: {
        'pattern-12': "url('/patterns/12.svg')"
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        violetColor: 'rgb(33, 134, 234)',
        foreground: 'hsl(var(--foreground))',
        pricingBackground: 'rgb(39, 45, 52)',
        customColor: 'rgb(76, 45, 235)',
        statsColor: 'rgb(39, 45, 52)',
        grayColor: 'rgb(149, 158, 169)',
        blackColor: 'rgb(21, 24, 27)',
        white: 'rgb(255, 255, 255)',
        greenColor: 'rgb(95, 207, 192)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        footer: 'hsl(var(--footer))',
        ollabot: 'hsl(var(--ollabot))'
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem', // 32px
        '5xl': '2.5rem', // 40px
        '6xl': '3rem' // 48px
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans]
      },
      keyframes: {
        // Accordion animations - faster, snappier
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' }
        },
        // Ripple effect - smooth and fast
        ripple: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) scale(4)', opacity: '0' }
        },
        // Pulse for loading states
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        // Gradient animation for backgrounds
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        // Shimmer effect - faster, more noticeable
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        // Marquee scrolling
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' }
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' }
        },
        // Fade in from bottom (entrance animation)
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        // Fade in from top
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        // Scale in (pop effect)
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        // Slide in from right (mobile menu)
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        // Slide in from left
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        // Spin (loading spinner)
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        // Faster, snappier accordions
        'accordion-down': 'accordion-down 150ms cubic-bezier(0.4, 0, 0, 1)',
        'accordion-up': 'accordion-up 150ms cubic-bezier(0.4, 0, 0, 1)',

        // Ripple effect
        'ripple': 'ripple 600ms cubic-bezier(0, 0, 0.2, 1)',
        'ripple-slow': 'ripple 1000ms cubic-bezier(0, 0, 0.2, 1)',

        // Pulse
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',

        // Gradient
        'gradient': 'gradient 3s ease infinite',
        'gradient-slow': 'gradient 6s ease infinite',

        // Shimmer - faster for better visibility
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'shimmer-slow': 'shimmer 3s ease-in-out infinite',

        // Marquee
        'marquee': 'marquee var(--duration, 30s) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration, 30s) linear infinite',

        // Entrance animations
        'fade-up': 'fade-up 200ms cubic-bezier(0.4, 0, 0, 1)',
        'fade-down': 'fade-down 200ms cubic-bezier(0.4, 0, 0, 1)',
        'scale-in': 'scale-in 150ms cubic-bezier(0.4, 0, 0, 1)',

        // Slide animations
        'slide-in-right': 'slide-in-right 200ms cubic-bezier(0.4, 0, 0, 1)',
        'slide-in-left': 'slide-in-left 200ms cubic-bezier(0.4, 0, 0, 1)',

        // Spin
        'spin': 'spin 1s linear infinite',
        'spin-slow': 'spin 2s linear infinite',
        'spin-fast': 'spin 0.6s linear infinite'
      },
      // Custom transition timing functions
      transitionTimingFunction: {
        'snappy': 'cubic-bezier(0.4, 0, 0, 1)',
        'smooth': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      // Faster transition durations
      transitionDuration: {
        '0': '0ms',
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
};
