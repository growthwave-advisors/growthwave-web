/**
 * @fileoverview Astro Configuration for GrowthWave Multi-Domain Website
 * @description Configures Astro with Tailwind CSS v4 via Vite plugin.
 * 
 * @see https://docs.astro.build/en/reference/configuration-reference/
 * @author GrowthWave Development Team
 * @version 1.0.0
 */

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // ---------------------------------------------------------------------------
  // Site Configuration
  // ---------------------------------------------------------------------------
  
  /** Production URL - update before deployment */
  site: 'https://growthwaveadvisors.com',
  
  // ---------------------------------------------------------------------------
  // Build Output
  // ---------------------------------------------------------------------------
  
  output: 'static',
  
  build: {
    /** Generate clean URLs without .html extension */
    format: 'directory',
    
    /** Inline small assets for performance */
    inlineStylesheets: 'auto',
  },
  
  // ---------------------------------------------------------------------------
  // Vite Configuration
  // ---------------------------------------------------------------------------
  
  vite: {
    plugins: [
      /** Tailwind CSS v4 integration via Vite plugin */
      tailwindcss(),
    ],
    
    /** Resolve path aliases to match tsconfig.json */
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@config': '/src/config',
        '@types': '/src/types',
        '@styles': '/src/styles',
        '@utils': '/src/utils',
      },
    },
  },
  
  // ---------------------------------------------------------------------------
  // Development Server
  // ---------------------------------------------------------------------------
  
  server: {
    port: 4321,
    host: true,
  },
  
  // ---------------------------------------------------------------------------
  // Prefetch Configuration
  // ---------------------------------------------------------------------------
  
  prefetch: {
    /** Prefetch links on hover for faster navigation */
    prefetchAll: true,
  },
});
