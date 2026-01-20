/**
 * @fileoverview Brand Type Definitions for GrowthWave Multi-Domain Website
 * @description Single source of truth for all brand-related TypeScript types.
 * Enforces consistency across components and enables compile-time validation.
 * 
 * @author GrowthWave Development Team
 * @version 1.0.0
 */

// =============================================================================
// CORE BRAND TYPES
// =============================================================================

/**
 * Valid brand identifiers for the GrowthWave family of websites.
 * Each brand corresponds to a distinct business division.
 */
export type BrandId = 'properties' | 'capital' | 'advisors';

/**
 * Hexadecimal color value with type safety.
 * @example '#265077'
 */
export type HexColor = `#${string}`;

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

/**
 * Configuration for a single navigation item.
 */
export interface NavItem {
  /** Display text for the link */
  readonly label: string;
  /** URL path (relative for internal, absolute for external) */
  readonly href: string;
  /** If true, opens in new tab with security attributes */
  readonly external?: boolean;
}

// =============================================================================
// ASSET PATH TYPES
// =============================================================================

/**
 * Logo file paths for different usage contexts.
 * All paths are relative to /public directory.
 */
export interface LogoAssets {
  /** Logo for light backgrounds - full color */
  readonly primary: string;
  /** Logo with transparent background for image overlays */
  readonly primaryTransparent: string;
  /** Logo for dark backgrounds - reversed/white version */
  readonly reversed: string;
}

/**
 * Favicon and PWA icon paths for a brand.
 * All paths are relative to /public directory.
 */
export interface FaviconAssets {
  /** Standard multi-size .ico file */
  readonly ico: string;
  /** 16x16 PNG for browser tabs */
  readonly png16: string;
  /** 32x32 PNG for high-DPI tabs */
  readonly png32: string;
  /** 180x180 PNG for iOS home screen */
  readonly appleTouchIcon: string;
  /** Web app manifest for PWA support */
  readonly manifest: string;
}

// =============================================================================
// COLOR CONFIGURATION TYPES
// =============================================================================

/**
 * Accent color palette for a single brand.
 * Includes pre-calculated opacity variants for consistent usage.
 */
export interface BrandAccentColors {
  /** Full opacity accent color for buttons, links, highlights */
  readonly accent: HexColor;
  /** 15% opacity variant for subtle backgrounds */
  readonly accentLight: string;
  /** 30% opacity variant for borders and dividers */
  readonly accentMedium: string;
  /** 80% opacity for glow effects (text-shadow) */
  readonly accentGlow: string;
}

/**
 * Core color palette shared across all GrowthWave brands.
 */
export interface CoreColors {
  /** Primary brand blue - #265077 */
  readonly oceanBlue: HexColor;
  /** Dark background color - #022140 */
  readonly darkNavy: HexColor;
  /** Secondary accent cyan - #51A7F8 */
  readonly waveCyan: HexColor;
  /** Primary body text - #595959 */
  readonly neutralGray: HexColor;
  /** Secondary/muted text - #718EA7 */
  readonly lightGray: HexColor;
  /** Pure white - #FFFFFF */
  readonly white: HexColor;
}

/**
 * Division-specific accent colors for cross-linking.
 */
export interface DivisionColors {
  /** Properties coral - #FF6B4A */
  readonly propertiesCoral: HexColor;
  /** Capital purple - #7C3AED */
  readonly capitalPurple: HexColor;
  /** Credit Sculpt green - #10B981 */
  readonly creditGreen: HexColor;
}

// =============================================================================
// SEO CONFIGURATION TYPES
// =============================================================================

/**
 * Default SEO metadata for a brand.
 */
export interface SeoDefaults {
  /** Suffix appended to page titles: "Page Title | {titleSuffix}" */
  readonly titleSuffix: string;
  /** Default meta description when page doesn't specify one */
  readonly description: string;
  /** Default Open Graph image URL */
  readonly ogImage?: string;
  /** Twitter card type */
  readonly twitterCard?: 'summary' | 'summary_large_image';
}

// =============================================================================
// COMPLETE BRAND CONFIGURATION
// =============================================================================

/**
 * Complete configuration object for a single brand.
 * Contains all information needed to render brand-aware components.
 */
export interface BrandConfig {
  /** Unique identifier matching BrandId type */
  readonly id: BrandId;
  /** Full display name (e.g., "GrowthWave Properties") */
  readonly name: string;
  /** Marketing tagline for hero sections and meta */
  readonly tagline: string;
  /** Production domain without protocol */
  readonly domain: string;
  /** Primary contact email */
  readonly email: string;
  /** Brand-specific color palette */
  readonly colors: BrandAccentColors;
  /** Logo asset paths */
  readonly logos: LogoAssets;
  /** Favicon asset paths */
  readonly favicons: FaviconAssets;
  /** Header navigation items */
  readonly navigation: readonly NavItem[];
  /** SEO default values */
  readonly seo: SeoDefaults;
}

/**
 * Map of all brand configurations keyed by BrandId.
 */
export type BrandConfigMap = {
  readonly [K in BrandId]: BrandConfig;
};

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

/**
 * Base props for any brand-aware component.
 */
export interface BrandAwareProps {
  /** Which brand's styling and content to render */
  readonly brand: BrandId;
}

/**
 * Props for Header component.
 */
export interface HeaderProps extends BrandAwareProps {
  /** Current page path for highlighting active nav item */
  readonly currentPath: string;
}

/**
 * Props for Footer component.
 */
export interface FooterProps extends BrandAwareProps {}

/**
 * Visual style variants for Button component.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * Size options for Button component.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for Button component.
 */
export interface ButtonProps extends BrandAwareProps {
  /** Visual style variant */
  readonly variant?: ButtonVariant;
  /** Size preset */
  readonly size?: ButtonSize;
  /** If provided, renders as anchor tag */
  readonly href?: string;
  /** Button type attribute (ignored if href is set) */
  readonly type?: 'button' | 'submit' | 'reset';
  /** Show animated arrow icon on hover */
  readonly showArrow?: boolean;
  /** Open link in new tab (only applies if href is set) */
  readonly external?: boolean;
  /** Additional CSS classes to merge */
  readonly class?: string;
}

/**
 * Props for BaseLayout component.
 */
export interface BaseLayoutProps extends BrandAwareProps {
  /** Page title (will be suffixed with brand name) */
  readonly title: string;
  /** Meta description for SEO */
  readonly description: string;
  /** Canonical URL for this page */
  readonly canonicalUrl?: string;
  /** Custom Open Graph image URL */
  readonly ogImage?: string;
  /** Disable indexing for this page */
  readonly noIndex?: boolean;
}
