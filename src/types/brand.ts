/**
 * GrowthWave Brand System Type Definitions
 * =========================================
 * Centralized type definitions for the multi-brand website architecture.
 * These types enforce consistency across all brand configurations and components.
 */

/** Unique identifier for each brand/division */
export type BrandId = 'properties' | 'capital' | 'advisors';

/** Division identifiers for cross-brand linking */
export type DivisionId = 'properties' | 'capital' | 'creditsculpt';

/** Brand color palette configuration */
export interface BrandColors {
  /** Primary brand color (Ocean Blue #265077) */
  readonly primary: string;
  /** Secondary brand color (Wave Cyan #51A7F8) */
  readonly secondary: string;
  /** Division accent color */
  readonly accent: string;
  /** Dark background color (Dark Navy #022140) */
  readonly dark: string;
  /** Body text color (Neutral Gray #595959) */
  readonly text: string;
  /** Light text color for dark backgrounds */
  readonly textLight: string;
}

/** Logo asset paths for each brand */
export interface BrandLogos {
  /** Primary logo (for light backgrounds) */
  readonly primary: string;
  /** Primary logo with transparent background */
  readonly primaryTransparent: string;
  /** Reversed logo (for dark backgrounds) */
  readonly reversed: string;
  /** Icon-only version */
  readonly icon: string;
}

/** Navigation item configuration */
export interface NavItem {
  /** Display label */
  readonly label: string;
  /** Relative URL path */
  readonly href: string;
}

/** SEO metadata for each brand */
export interface BrandSEO {
  /** Site title (used in <title> tag) */
  readonly title: string;
  /** Meta description */
  readonly description: string;
  /** OpenGraph image path */
  readonly ogImage: string;
  /** Canonical domain */
  readonly domain: string;
}

/** Division link for cross-brand footer navigation */
export interface DivisionLink {
  /** Division identifier */
  readonly id: DivisionId;
  /** Display name */
  readonly name: string;
  /** Full URL */
  readonly url: string;
  /** Accent color for glow effect */
  readonly color: string;
}

/** Contact information */
export interface BrandContact {
  /** Primary email address */
  readonly email: string;
  /** Location display string */
  readonly location: string;
  /** Optional phone number */
  readonly phone?: string;
}

/** Complete brand configuration */
export interface BrandConfig {
  /** Unique brand identifier */
  readonly id: BrandId;
  /** Display name */
  readonly name: string;
  /** Tagline for footer/about sections */
  readonly tagline: string;
  /** Color palette */
  readonly colors: BrandColors;
  /** Logo assets */
  readonly logos: BrandLogos;
  /** Navigation items */
  readonly navigation: readonly NavItem[];
  /** SEO metadata */
  readonly seo: BrandSEO;
  /** Contact information */
  readonly contact: BrandContact;
  /** CTA button text for header */
  readonly ctaText: string;
  /** CTA button URL */
  readonly ctaUrl: string;
}

/** Type for the brands configuration object */
export type BrandsConfig = {
  readonly [K in BrandId]: BrandConfig;
};

/** Division links shared across all brands */
export type DivisionLinks = readonly DivisionLink[];

/** Button variant types */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/** Button size types */
export type ButtonSize = 'sm' | 'md' | 'lg';
