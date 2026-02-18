/**
 * GrowthWave Brand Configuration
 * ===============================
 * Centralized configuration for all three GrowthWave brands.
 * Single source of truth for colors, logos, navigation, and SEO.
 */

import type {
  BrandId,
  BrandConfig,
  BrandsConfig,
  DivisionLinks,
} from "@brand-types/brand";

/**
 * Core brand colors shared across all divisions
 */
export const coreColors = {
  oceanBlue: "#265077",
  darkNavy: "#022140",
  waveCyan: "#51A7F8",
  neutralGray: "#595959",
  lightGray: "#718EA7",
  white: "#FFFFFF",
} as const;

/**
 * Division accent colors
 */
export const divisionColors = {
  propertiesCoral: "#FF6B4A",
  capitalPurple: "#7C3AED",
  creditGreen: "#10B981",
} as const;

/**
 * Division links for cross-brand footer navigation
 */
export const divisionLinks: DivisionLinks = [
  {
    id: "properties",
    name: "GrowthWave Properties",
    url: "https://growthwaveproperties.com",
    color: divisionColors.propertiesCoral,
  },
  {
    id: "capital",
    name: "GrowthWave Capital",
    url: "https://growthwavecapital.com",
    color: divisionColors.capitalPurple,
  },
  {
    id: "creditsculpt",
    name: "Credit Sculpt",
    url: "https://creditsculpt.com",
    color: divisionColors.creditGreen,
  },
] as const;

/**
 * Complete brand configurations
 */
export const brands: BrandsConfig = {
  properties: {
    id: "properties",
    name: "GrowthWave Properties",
    tagline: "Building wealth through strategic multifamily investment.",
    colors: {
      primary: coreColors.oceanBlue,
      secondary: coreColors.waveCyan,
      accent: divisionColors.propertiesCoral,
      dark: coreColors.darkNavy,
      text: coreColors.neutralGray,
      textLight: coreColors.white,
    },
    logos: {
      primary:
        "/images/logos/properties/growthwave-properties_horizontal_color.svg",
      primaryTransparent:
        "/images/logos/properties/growthwave-properties_horizontal_color.svg",
      reversed:
        "/images/logos/properties/growthwave-properties_horizontal_reversed.svg",
      icon: "/images/logos/icons/icon_color.svg",
    },
    navigation: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Approach", href: "/approach" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
    seo: {
      title: "GrowthWave Properties | Value-Add Multifamily Investment",
      description:
        "Partner with us for strategic multifamily real estate investments in the Midwest & South. 15 years banking experience. Value-add focus with 2-5 year hold periods.",
      ogImage: "/images/og/properties-og.jpg",
      domain: "growthwaveproperties.com",
    },
    contact: {
      email: "info@growthwaveproperties.com",
      location: "Orlando, FL",
    },
    ctaText: "Partner With Us",
    ctaUrl: "/contact",
  },
  capital: {
    id: "capital",
    name: "GrowthWave Capital",
    tagline: "Fueling your business growth with smart financing.",
    colors: {
      primary: coreColors.oceanBlue,
      secondary: coreColors.waveCyan,
      accent: divisionColors.capitalPurple,
      dark: coreColors.darkNavy,
      text: coreColors.neutralGray,
      textLight: coreColors.white,
    },
    logos: {
      primary: "/images/logos/capital/growthwave-capital_horizontal_color.svg",
      primaryTransparent:
        "/images/logos/capital/growthwave-capital_horizontal_color.svg",
      reversed:
        "/images/logos/capital/growthwave-capital_horizontal_reversed.svg",
      icon: "/images/logos/icons/icon_color.svg",
    },
    navigation: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Solutions", href: "/solutions" },
      { label: "Guide", href: "/guide" },
      { label: "Contact", href: "/contact" },
    ],
    seo: {
      title: "GrowthWave Capital | Business Financing for Investors",
      description:
        "Access business credit, financing, and DSCR loans to fund your deals. Enterprise-grade technology meets personalized service.",
      ogImage: "/images/og/capital-og.jpg",
      domain: "growthwavecapital.com",
    },
    contact: {
      email: "info@growthwavecapital.com",
      location: "Orlando, FL",
    },
    ctaText: "Get Your Free Guide",
    ctaUrl: "/guide",
  },
  advisors: {
    id: "advisors",
    name: "GrowthWave Advisors",
    tagline: "Integrated financial services for investors.",
    colors: {
      primary: coreColors.oceanBlue,
      secondary: coreColors.waveCyan,
      accent: coreColors.oceanBlue,
      dark: coreColors.darkNavy,
      text: coreColors.neutralGray,
      textLight: coreColors.white,
    },
    logos: {
      primary:
        "/images/logos/advisors/growthwave-advisors_horizontal_color.svg",
      primaryTransparent:
        "/images/logos/advisors/growthwave-advisors_horizontal_color.svg",
      reversed:
        "/images/logos/advisors/growthwave-advisors_horizontal_reversed.svg",
      icon: "/images/logos/icons/icon_color.svg",
    },
    navigation: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
    seo: {
      title: "GrowthWave Advisors | The Investor Success Flywheel™",
      description:
        "From credit repair to business financing to real estate investment. The integrated path to building wealth through smart leverage.",
      ogImage: "/images/og/advisors-og.jpg",
      domain: "growthwaveadvisors.com",
    },
    contact: {
      email: "hello@growthwaveadvisors.com",
      location: "Orlando, FL",
    },
    ctaText: "Get Started",
    ctaUrl: "/contact",
  },
} as const;

/**
 * Get brand configuration by ID
 * @param brandId - The brand identifier
 * @returns Complete brand configuration
 */
export function getBrand(brandId: BrandId): BrandConfig {
  return brands[brandId];
}

/**
 * Get all brand IDs
 * @returns Array of brand identifiers
 */
export function getBrandIds(): readonly BrandId[] {
  return Object.keys(brands) as BrandId[];
}
