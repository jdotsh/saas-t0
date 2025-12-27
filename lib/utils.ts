import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ms from 'ms';

import { env } from '@/env.mjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_APP_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL; // Automatically set by Vercel.

  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_APP_URL or NEXT_PUBLIC_VERCEL_URL');
  }

  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  url = url.concat('auth/callback');
  return url;
};

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

// ============================================================================
// PROFESSIONAL UTILITIES (Adapted from next-money for production polish)
// ============================================================================

/**
 * Format numbers with K, M, B, T suffixes
 * Examples: 1000 → 1K, 1000000 → 1M, 1500000 → 1.5M
 */
export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

/**
 * Format prices in cents to dollars
 * Examples: 1000 → $10.00, 1550 → $15.50
 */
export function formatPrice(price?: number, currency = "$") {
  return price ? currency + (price / 100).toFixed(2) : `${currency}0.00`;
}

/**
 * Time ago formatter
 * Examples: 2 minutes ago, 3 hours ago, 1 day ago
 */
export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

/**
 * Truncate string with ellipsis
 * Examples: truncate("Hello World", 5) → "Hello..."
 */
export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

/**
 * Capitalize first letter
 * Examples: capitalize("hello") → "Hello"
 */
export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Type-safe fetcher for SWR and data fetching
 */
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}