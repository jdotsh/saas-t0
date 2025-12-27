'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

/**
 * Simple ON/OFF Dark Mode Toggle Switch
 *
 * Clean toggle button that switches between light and dark themes
 * No dropdown menu - just a simple click to toggle
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      className="size-8 px-0"
      size="sm"
      variant="ghost"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// 'use client'

// import { useTheme } from 'next-themes'
// import * as React from 'react'
// import { Icons } from '@/components/icons'
// import { Button } from '@/components/ui/button'

// export function ModeToggle() {
//   const { theme, setTheme } = useTheme()

//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light')
//   }

//   return (
//     <Button className="size-8 px-0" size="sm" variant="ghost" onClick={toggleTheme}>
//       {theme === 'light' ? (
//         <Icons.sun className="rotate-0 scale-100 transition-all" />
//       ) : (
//         <Icons.moon className="rotate-0 scale-100 transition-all" />
//       )}
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   )
// }
