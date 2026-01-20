/**
 * @fileoverview Centralized Brand Configuration for GrowthWave Websites
 * @description Single source of truth for all brand-specific data including
 * colors, logos, navigation, and SEO defaults. Import this config into any
 * component that needs brand-aware rendering.
 * 
 * @example
 * ```typescript
 * import { brands, coreColors } from '@config/brands';
 * const config = brands.properties;
 * console.log(config.colors.accent); // '#FF6B4A'
 * ```
 * 
 * @author GrowthWave Development Team
 * @version 1.0.0
 */

import type {
  BrandId,
  BrandConfig,
  BrandConfigMap,
  CoreColors,
  DivisionColors,
} from '../types/brand';

// =============================================================================
// CORE COLOR PALETTE
// =============================================================================

/**
 * Core colors shared across all GrowthWave brands.
 * Use these for consistent backgrounds, text, and structural elements.
 */
export const coreColors: CoreColors = {
  oceanBlue: '#265077',
  darkNavy: '#022140',
  waveCyan: '#51A7F8',
  neutralGray: '#595959',
  lightGray: '#718EA7',
  white: '#FFFFFF',
} as const;

/**
 * Division-specific accent colors for cross-brand linking in footers.
 */
export const divisionColors: DivisionColors = {
  propertiesCoral: '#FF6B4A',
  capitalPurple: '#7C3AED',
  creditGreen: '#10B981',
} as const;

// =============================================================================
// BRAND CONFIGURATIONS
// =============================================================================

/**
 * GrowthWave Properties brand configuration.
 * Real estate investment division focusing on multifamily value-add.
 */
const propertiesConfig: BrandConfig = {
  id: 'properties',
  name: 'GrowthWave Properties',
  tagline: 'Building Wealth Through Real Estate',
  domain: 'growthwaveproperties.com',
  email: 'wilfred@growthwaveproperties.com',
  
  colors: {
    accent: '#FF6B4A',
    accentLight: 'rgba(255, 107, 74, 0.15)',
    accentMedium: 'rgba(255, 107, 74, 0.30)',
    accentGlow: 'rgba(255, 107, 74, 0.80)',
  },
  
  logos: {
    primary: '/images/logos/properties/logo-primary.svg',
    primaryTransparent: '/images/logos/properties/logo-primary-transparent.svg',
    reversed: '/images/logos/properties/logo-reversed.svg',
  },
  
  favicons: {
    ico: '/favicon/properties/favicon.ico',
    png16: '/favicon/properties/favicon-16x16.png',
    png32: '/favicon/properties/favicon-32x32.png',
    appleTouchIcon: '/favicon/properties/apple-touch-icon.png',
    manifest: '/favicon/properties/site.webmanifest',
  },
  
  navigation: [
    { label: 'Home', href: '/properties/' },
    { label: 'About', href: '/properties/about/' },
    { label: 'Approach', href: '/properties/approach/' },
    { label: 'Portfolio', href: '/properties/portfolio/' },
    { label: 'Contact', href: '/properties/contact/' },
  ],
  
  seo: {
    titleSuffix: 'GrowthWave Properties',
    description: 'Partner with experienced operators on cash-flowing multifamily properties. Value-add investments in the Midwest and South regions.',
    twitterCard: 'summary_large_image',
  },
} as const;

/**
 * GrowthWave Capital brand configuration.
 * Business financing division focusing on real estate investor funding.
 */
const capitalConfig: BrandConfig = {
  id: 'capital',
  name: 'GrowthWave Capital',
  tagline: 'Fueling Your Business Growth',
  domain: 'growthwavecapital.com',
  email: 'wilfred@growthwavecapital.com',
  
  colors: {
    accent: '#7C3AED',
    accentLight: 'rgba(124, 58, 237, 0.15)',
    accentMedium: 'rgba(124, 58, 237, 0.30)',
    accentGlow: 'rgba(124, 58, 237, 0.80)',
  },
  
  logos: {
    primary: '/images/logos/capital/logo-primary.svg',
    primaryTransparent: '/images/logos/capital/logo-primary-transparent.svg',
    reversed: '/images/logos/capital/logo-reversed.svg',
  },
  
  favicons: {
    ico: '/favicon/capital/favicon.ico',
    png16: '/favicon/capital/favicon-16x16.png',
    png32: '/favicon/capital/favicon-32x32.png',
    appleTouchIcon: '/favicon/capital/apple-touch-icon.png',
    manifest: '/favicon/capital/site.webmanifest',
  },
  
  navigation: [
    { label: 'Home', href: '/capital/' },
    { label: 'Services', href: '/capital/services/' },
    { label: 'About', href: '/capital/about/' },
    { label: 'Apply', href: '/capital/apply/' },
    { label: 'Contact', href: '/capital/contact/' },
  ],
  
  seo: {
    titleSuffix: 'GrowthWave Capital',
    description: 'Access $50K-$250K+ in business credit and financing. Enterprise-grade technology platform built by a former Credit Union CTO with 15 years of banking experience.',
    twitterCard: 'summary_large_image',
  },
} as const;

/**
 * GrowthWave Advisors brand configuration.
 * Corporate hub connecting all divisions via the Investor Success Flywheel.
 */
const advisorsConfig: BrandConfig = {
  id: 'advisors',
  name: 'GrowthWave Advisors',
  tagline: 'Building the Investor Success Flywheel™',
  domain: 'growthwaveadvisors.com',
  email: 'wilfred@growthwaveadvisors.com',
  
  colors: {
    accent: '#265077', // Uses Ocean Blue as accent
    accentLight: 'rgba(38, 80, 119, 0.15)',
    accentMedium: 'rgba(38, 80, 119, 0.30)',
    accentGlow: 'rgba(38, 80, 119, 0.80)',
  },
  
  logos: {
    primary: '/images/logos/advisors/logo-primary.svg',
    primaryTransparent: '/images/logos/advisors/logo-primary-transparent.svg',
    reversed: '/images/logos/advisors/logo-reversed.svg',
  },
  
  favicons: {
    ico: '/favicon/advisors/favicon.ico',
    png16: '/favicon/advisors/favicon-16x16.png',
    png32: '/favicon/advisors/favicon-32x32.png',
    appleTouchIcon: '/favicon/advisors/apple-touch-icon.png',
    manifest: '/favicon/advisors/site.webmanifest',
  },
  
  navigation: [
    { label: 'Home', href: '/advisors/' },
    { label: 'Our Companies', href: '/advisors/companies/' },
    { label: 'About', href: '/advisors/about/' },
    { label: 'Contact', href: '/advisors/contact/' },
  ],
  
  seo: {
    titleSuffix: 'GrowthWave Advisors',
    description: 'Integrated financial services for investors. From credit repair through business financing to cash-flowing real estate investments.',
    twitterCard: 'summary_large_image',
  },
} as const;

// =============================================================================
// EXPORTED CONFIGURATION
// =============================================================================

/**
 * Complete brand configuration map.
 * Access individual brands via `brands.properties`, `brands.capital`, etc.
 */
export const brands: BrandConfigMap = {
  properties: propertiesConfig,
  capital: capitalConfig,
  advisors: advisorsConfig,
} as const;

/**
 * Division link data for footer cross-linking.
 * Used by Footer component to display all divisions with proper glow effects.
 */
export const divisionLinks = [
  {
    name: 'GrowthWave Properties',
    href: 'https://growthwaveproperties.com',
    color: divisionColors.propertiesCoral,
    glowColor: 'rgba(255, 107, 74, 0.80)',
  },
  {
    name: 'GrowthWave Capital',
    href: 'https://growthwavecapital.com',
    color: divisionColors.capitalPurple,
    glowColor: 'rgba(124, 58, 237, 0.80)',
  },
  {
    name: 'Credit Sculpt',
    href: 'https://creditsculpt.com',
    color: divisionColors.creditGreen,
    glowColor: 'rgba(16, 185, 129, 0.80)',
  },
] as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Retrieves brand configuration by ID with type safety.
 * @param brandId - The brand identifier
 * @returns Complete brand configuration object
 * 
 * @example
 * ```typescript
 * const config = getBrandConfig('properties');
 * console.log(config.name); // 'GrowthWave Properties'
 * ```
 */
export function getBrandConfig(brandId: BrandId): BrandConfig {
  return brands[brandId];
}

/**
 * Checks if a given string is a valid BrandId.
 * Useful for validating URL parameters or user input.
 * @param value - String to validate
 * @returns Type predicate indicating if value is a valid BrandId
 * 
 * @example
 * ```typescript
 * const param = 'properties';
 * if (isValidBrandId(param)) {
 *   const config = getBrandConfig(param); // TypeScript knows param is BrandId
 * }
 * ```
 */
export function isValidBrandId(value: string): value is BrandId {
  return value === 'properties' || value === 'capital' || value === 'advisors';
}

/**
 * Generates the full page title with brand suffix.
 * @param pageTitle - The page-specific title
 * @param brandId - The brand identifier
 * @returns Formatted title string
 * 
 * @example
 * ```typescript
 * getFullPageTitle('About', 'properties');
 * // Returns: 'About | GrowthWave Properties'
 * ```
 */
export function getFullPageTitle(pageTitle: string, brandId: BrandId): string {
  const brandConfig = getBrandConfig(brandId);
  return `${pageTitle} | ${brandConfig.seo.titleSuffix}`;
}
