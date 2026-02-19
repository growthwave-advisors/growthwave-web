/**
 * GrowthWave Domain Router - Netlify Edge Function
 * =================================================
 * 
 * FIXED VERSION - Handles trailing slashes to prevent redirect exposure
 * 
 * This edge function runs at Netlify's CDN edge and rewrites URLs based on hostname.
 * It enables clean URLs (no /advisors/ prefix) while serving content from brand subdirectories.
 * 
 * HOW IT WORKS:
 * 1. Incoming request: https://growthwaveadvisors.com/about
 * 2. Edge function detects hostname → maps to brand "advisors"
 * 3. Rewrites URL internally to: /advisors/about/  (with trailing slash!)
 * 4. Serves /advisors/about/index.html content
 * 5. User sees clean URL: https://growthwaveadvisors.com/about
 * 
 * CRITICAL FIX: We add trailing slash in the rewrite to match Astro's output
 * structure (/advisors/about/index.html), preventing Netlify from issuing
 * a 301 redirect that would reveal the internal path.
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

// File extensions that should NOT get trailing slash treatment
const FILE_EXTENSIONS = [
  ".html", ".css", ".js", ".json", ".xml", ".txt", ".svg", ".png",
  ".pdf", ".docx",
  ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".woff", ".woff2", ".ttf"
];

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const pathname = url.pathname;

  // Check if this is a passthrough path (shared assets)
  for (const prefix of PASSTHROUGH_PATHS) {
    if (pathname.startsWith(prefix)) {
      return context.next();
    }
  }

  // Get the brand for this hostname
  const brand = DOMAIN_BRAND_MAP[hostname];

  // If no brand mapping found (e.g., netlify.app URL or localhost)
  if (!brand) {
    return context.next();
  }

  // Check if the path already has the brand prefix
  if (pathname.startsWith(`/${brand}/`) || pathname === `/${brand}`) {
    return context.next();
  }

  // Check if this is a file request (has extension)
  const isFileRequest = FILE_EXTENSIONS.some(ext => pathname.endsWith(ext));

  // Build the rewritten path
  let newPathname: string;
  
  if (pathname === "/") {
    // Root path → /advisors/
    newPathname = `/${brand}/`;
  } else if (isFileRequest) {
    // File request → don't add trailing slash
    newPathname = `/${brand}${pathname}`;
  } else {
    // Page request → ensure trailing slash to match Astro's output
    // This prevents Netlify from issuing a redirect that reveals the path
    newPathname = pathname.endsWith("/") 
      ? `/${brand}${pathname}` 
      : `/${brand}${pathname}/`;
  }

  // Preserve query parameters
  const queryString = url.search;
  const rewritePath = newPathname + queryString;

  // REWRITE (not redirect) - browser URL stays the same
  return context.rewrite(rewritePath);
}

// Configure which paths this edge function runs on
export const config = {
  path: "/*",
};
