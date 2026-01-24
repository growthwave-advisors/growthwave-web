/**
 * GrowthWave Domain Router - Netlify Edge Function
 * =================================================
 * 
 * This edge function runs at Netlify's CDN edge and rewrites URLs based on hostname.
 * It enables clean URLs (no /advisors/ prefix) while serving content from brand subdirectories.
 * 
 * HOW IT WORKS:
 * 1. Incoming request: https://growthwaveadvisors.com/about
 * 2. Edge function detects hostname → maps to brand "advisors"
 * 3. Rewrites URL internally to: /advisors/about
 * 4. Serves /advisors/about content
 * 5. User sees clean URL: https://growthwaveadvisors.com/about
 * 
 * IMPORTANT: This is a REWRITE (not redirect) - the URL in the browser stays clean.
 */

import type { Context } from "https://edge.netlify.com";

// Domain to brand mapping
const DOMAIN_BRAND_MAP: Record<string, string> = {
  "growthwaveadvisors.com": "advisors",
  "www.growthwaveadvisors.com": "advisors",
  "growthwavecapital.com": "capital",
  "www.growthwavecapital.com": "capital",
  "growthwaveproperties.com": "properties",
  "www.growthwaveproperties.com": "properties",
};

// Paths that should NOT be rewritten (shared assets, dev tools)
const PASSTHROUGH_PATHS = [
  "/images/",
  "/favicon/",
  "/fonts/",
  "/_astro/",
  "/dev/",
  "/.netlify/",
];

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const pathname = url.pathname;

  // Check if this is a passthrough path (shared assets)
  for (const prefix of PASSTHROUGH_PATHS) {
    if (pathname.startsWith(prefix)) {
      // Let the request pass through unchanged
      return context.next();
    }
  }

  // Get the brand for this hostname
  const brand = DOMAIN_BRAND_MAP[hostname];

  // If no brand mapping found (e.g., netlify.app URL or localhost)
  if (!brand) {
    // Let the request pass through unchanged (shows Hub page)
    return context.next();
  }

  // Check if the path already has the brand prefix
  if (pathname.startsWith(`/${brand}/`) || pathname === `/${brand}`) {
    // Already has prefix - pass through
    return context.next();
  }

  // Rewrite the URL to include the brand prefix
  // /about → /advisors/about
  // / → /advisors/
  const newPathname = pathname === "/" 
    ? `/${brand}/` 
    : `/${brand}${pathname}`;

  // Create the new URL with rewritten path
  const newUrl = new URL(newPathname, url.origin);
  newUrl.search = url.search; // Preserve query parameters

  // Fetch the content from the rewritten URL
  // This is a REWRITE - the browser URL stays the same
  return context.rewrite(newUrl.toString());
}

// Configure which paths this edge function runs on
export const config = {
  path: "/*",
};
