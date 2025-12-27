/**
 * useMediaQuery Hook
 *
 * Detect device type and screen dimensions with responsive breakpoints.
 * Adapted from next-money-main for professional responsive design.
 *
 * Usage:
 * const { device, isMobile, isDesktop, width, height } = useMediaQuery();
 * if (isMobile) { // Show mobile UI }
 */

import { useEffect, useState } from "react";

export function useMediaQuery() {
  const [device, setDevice] = useState<
    "mobile" | "sm" | "tablet" | "desktop" | null
  >(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setDevice("mobile");
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setDevice("sm");
      } else if (
        window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches
      ) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial detection
    checkDevice();

    // Listener for window resize
    window.addEventListener("resize", checkDevice);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === "mobile",
    isSm: device === "sm",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
