# GrowthWave Website Assets Reference

**Generated:** January 19, 2026  
**Purpose:** Complete reference for all logo, favicon, and image assets with proper paths and accessibility attributes.

---

## 📁 Directory Structure

```
public/
├── images/
│   └── logos/
│       ├── advisors/
│       │   ├── logo-primary.svg           (white background)
│       │   ├── logo-primary-transparent.svg
│       │   └── logo-reversed.svg          (for dark backgrounds)
│       ├── capital/
│       │   ├── logo-primary.svg
│       │   ├── logo-primary-transparent.svg
│       │   └── logo-reversed.svg
│       ├── properties/
│       │   ├── logo-primary.svg
│       │   ├── logo-primary-transparent.svg
│       │   └── logo-reversed.svg
│       └── icons/
│           ├── icon-primary.svg
│           ├── icon-primary-transparent.svg
│           ├── icon-reversed.svg
│           └── icon-reversed-transparent.svg
└── favicon/
    ├── advisors/
    │   ├── favicon.ico
    │   ├── favicon-16x16.png
    │   ├── favicon-32x32.png
    │   ├── apple-touch-icon.png      (180x180)
    │   ├── android-chrome-192x192.png
    │   ├── android-chrome-512x512.png
    │   └── site.webmanifest
    ├── capital/
    │   └── (same structure)
    └── properties/
        └── (same structure)
```

---

## 🖼️ Logo Assets

### GrowthWave Properties

| Asset | Path | Alt Text | Usage |
|-------|------|----------|-------|
| Primary Logo | `/images/logos/properties/logo-primary.svg` | "GrowthWave Properties - Building Wealth Through Real Estate" | Header on white/light backgrounds |
| Primary Transparent | `/images/logos/properties/logo-primary-transparent.svg` | "GrowthWave Properties - Building Wealth Through Real Estate" | Overlay on images, hero sections |
| Reversed Logo | `/images/logos/properties/logo-reversed.svg` | "GrowthWave Properties - Building Wealth Through Real Estate" | Footer, dark navy backgrounds |

**Astro Component Usage:**
```astro
<!-- Header (light background) -->
<img 
  src="/images/logos/properties/logo-primary-transparent.svg" 
  alt="GrowthWave Properties - Building Wealth Through Real Estate"
  width="200"
  height="60"
  class="logo"
/>

<!-- Footer (dark background) -->
<img 
  src="/images/logos/properties/logo-reversed.svg" 
  alt="GrowthWave Properties - Building Wealth Through Real Estate"
  width="180"
  height="54"
  class="logo-footer"
/>
```

### GrowthWave Capital

| Asset | Path | Alt Text | Usage |
|-------|------|----------|-------|
| Primary Logo | `/images/logos/capital/logo-primary.svg` | "GrowthWave Capital - Fueling Your Business Growth" | Header on white/light backgrounds |
| Primary Transparent | `/images/logos/capital/logo-primary-transparent.svg` | "GrowthWave Capital - Fueling Your Business Growth" | Overlay on images, hero sections |
| Reversed Logo | `/images/logos/capital/logo-reversed.svg` | "GrowthWave Capital - Fueling Your Business Growth" | Footer, dark navy backgrounds |

### GrowthWave Advisors

| Asset | Path | Alt Text | Usage |
|-------|------|----------|-------|
| Primary Logo | `/images/logos/advisors/logo-primary.svg` | "GrowthWave Advisors - Integrated Financial Services" | Header on white/light backgrounds |
| Primary Transparent | `/images/logos/advisors/logo-primary-transparent.svg` | "GrowthWave Advisors - Integrated Financial Services" | Overlay on images, hero sections |
| Reversed Logo | `/images/logos/advisors/logo-reversed.svg` | "GrowthWave Advisors - Integrated Financial Services" | Footer, dark navy backgrounds |

### Shared Icons (All Brands)

| Asset | Path | Alt Text | Usage |
|-------|------|----------|-------|
| Icon Primary | `/images/logos/icons/icon-primary.svg` | "GrowthWave" | Mobile header, favicons, small spaces |
| Icon Primary Transparent | `/images/logos/icons/icon-primary-transparent.svg` | "GrowthWave" | Overlay applications |
| Icon Reversed | `/images/logos/icons/icon-reversed.svg` | "GrowthWave" | Dark backgrounds |
| Icon Reversed Transparent | `/images/logos/icons/icon-reversed-transparent.svg` | "GrowthWave" | Dark overlay applications |

---

## 🔖 Favicon Implementation

### HTML Head Tags (Per Brand)

**GrowthWave Properties:**
```html
<link rel="icon" type="image/x-icon" href="/favicon/properties/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/properties/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/properties/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/properties/apple-touch-icon.png">
<link rel="manifest" href="/favicon/properties/site.webmanifest">
<meta name="theme-color" content="#265077">
```

**GrowthWave Capital:**
```html
<link rel="icon" type="image/x-icon" href="/favicon/capital/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/capital/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/capital/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/capital/apple-touch-icon.png">
<link rel="manifest" href="/favicon/capital/site.webmanifest">
<meta name="theme-color" content="#265077">
```

**GrowthWave Advisors:**
```html
<link rel="icon" type="image/x-icon" href="/favicon/advisors/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/advisors/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/advisors/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/advisors/apple-touch-icon.png">
<link rel="manifest" href="/favicon/advisors/site.webmanifest">
<meta name="theme-color" content="#265077">
```

---

## 🎨 Logo Selection Guide

### By Background Color

| Background | Logo Version | Example |
|------------|--------------|---------|
| White (#FFFFFF) | `logo-primary-transparent.svg` | Standard header |
| Light Gray | `logo-primary-transparent.svg` | Light sections |
| Dark Navy (#022140) | `logo-reversed.svg` | Footer, hero overlays |
| Image Overlay | `logo-primary-transparent.svg` or `logo-reversed.svg` | Depends on image darkness |

### By Viewport Size

| Viewport | Logo Type | Max Width |
|----------|-----------|-----------|
| Desktop (1024px+) | Full horizontal logo | 200-240px |
| Tablet (768-1023px) | Full horizontal logo | 180px |
| Mobile (<768px) | Icon only OR stacked | 40-60px (icon) |

---

## ♿ Accessibility Requirements (WCAG 2.1 AA)

### Alt Text Rules

1. **Logos must have descriptive alt text** that includes:
   - Company name
   - Brief value proposition (for first occurrence on page)

2. **Decorative instances** (e.g., repeated in footer when already in header):
   - Use empty alt: `alt=""`
   - Add `role="presentation"` or `aria-hidden="true"`

3. **Linked logos** (e.g., header logo linking to homepage):
   - Alt text should describe destination: `alt="GrowthWave Properties homepage"`

### Example Implementations

```astro
<!-- First logo on page (descriptive) -->
<a href="/properties/">
  <img 
    src="/images/logos/properties/logo-primary-transparent.svg" 
    alt="GrowthWave Properties homepage - Building Wealth Through Real Estate"
    width="200"
    height="60"
  />
</a>

<!-- Footer logo (decorative, already described above) -->
<img 
  src="/images/logos/properties/logo-reversed.svg" 
  alt=""
  role="presentation"
  width="160"
  height="48"
/>
```

---

## 📐 Logo Sizing Guidelines

### Recommended Dimensions

| Location | Width | Height (auto) | Notes |
|----------|-------|---------------|-------|
| Desktop Header | 200px | auto | Primary display |
| Mobile Header | 160px | auto | Responsive scaling |
| Footer | 160px | auto | Slightly smaller |
| Email Signature | 180px | auto | Per brand guidelines |
| Social Profile | icon-only | 60x60 | Square crop safe |

### Minimum Sizes

- **Digital:** 150px minimum width
- **Print:** 1 inch minimum width
- **Favicon:** 16x16px minimum

### Clear Space

Minimum clear space around logo = height of the "G" in GrowthWave

---

## 🔗 Quick Reference: Common Paths

### Properties Site
```
Logo (header):    /images/logos/properties/logo-primary-transparent.svg
Logo (footer):    /images/logos/properties/logo-reversed.svg
Favicon:          /favicon/properties/favicon.ico
Manifest:         /favicon/properties/site.webmanifest
```

### Capital Site
```
Logo (header):    /images/logos/capital/logo-primary-transparent.svg
Logo (footer):    /images/logos/capital/logo-reversed.svg
Favicon:          /favicon/capital/favicon.ico
Manifest:         /favicon/capital/site.webmanifest
```

### Advisors Site
```
Logo (header):    /images/logos/advisors/logo-primary-transparent.svg
Logo (footer):    /images/logos/advisors/logo-reversed.svg
Favicon:          /favicon/advisors/favicon.ico
Manifest:         /favicon/advisors/site.webmanifest
```

---

## ✅ Asset Checklist

### Logos (SVG)
- [x] Properties: Primary, Primary Transparent, Reversed
- [x] Capital: Primary, Primary Transparent, Reversed
- [x] Advisors: Primary, Primary Transparent, Reversed
- [x] Icons: Primary, Primary Transparent, Reversed, Reversed Transparent

### Favicons (Per Brand)
- [x] favicon.ico (16x16 + 32x32 combined)
- [x] favicon-16x16.png
- [x] favicon-32x32.png
- [x] apple-touch-icon.png (180x180)
- [x] android-chrome-192x192.png
- [x] android-chrome-512x512.png
- [x] site.webmanifest

---

**Document Version:** 1.0  
**Last Updated:** January 19, 2026
