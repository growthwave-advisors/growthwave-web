# GrowthWave Web

Multi-brand website for GrowthWave Advisors and its divisions, built with Astro, React, and Tailwind CSS.

## Overview

This repository contains the websites for three GrowthWave divisions:

| Brand | Domain | Description |
|-------|--------|-------------|
| **GrowthWave Advisors** | growthwaveadvisors.com | Parent brand - Integrated financial services |
| **GrowthWave Capital** | growthwavecapital.com | Business financing & credit solutions |
| **GrowthWave Properties** | growthwaveproperties.com | Multifamily real estate investment |

All three sites share a unified design system while maintaining distinct brand identities through accent colors.

## Tech Stack

- **Framework:** [Astro](https://astro.build/) 5.x
- **UI Components:** React 18
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Hosting:** Netlify
- **Version Control:** Git/GitHub

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/growthwave-web.git
cd growthwave-web

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Project Structure

```
growthwave-web/
├── public/
│   ├── favicon/           # Brand-specific favicons
│   │   ├── advisors/
│   │   ├── capital/
│   │   └── properties/
│   └── images/
│       └── logos/         # Brand logos (SVG)
│           ├── advisors/
│           ├── capital/
│           ├── properties/
│           └── icons/
├── src/
│   ├── components/        # Reusable Astro/React components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Button.astro
│   │   └── shared/
│   ├── config/
│   │   └── brands.ts      # Brand configuration (colors, nav, SEO)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro    # Hub page (dev only)
│   │   ├── dev/           # Style guide (dev only)
│   │   ├── advisors/      # GrowthWave Advisors pages
│   │   ├── capital/       # GrowthWave Capital pages
│   │   └── properties/    # GrowthWave Properties pages
│   ├── styles/
│   │   └── global.css     # Tailwind imports & custom utilities
│   └── types/
│       └── brand.ts       # TypeScript type definitions
├── scripts/               # Maintenance & build scripts
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Brand Architecture

### Unified Design System

All brands share:
- **Font:** Outfit (Google Fonts)
- **Primary Colors:** Ocean Blue (#265077), Dark Navy (#022140)
- **Layout Patterns:** Fixed Island responsive design
- **Components:** Header, Footer, Button, etc.

### Division Accent Colors

| Brand | Accent Color | Hex |
|-------|--------------|-----|
| Advisors | Wave Cyan | `#51A7F8` |
| Capital | Royal Purple | `#7C3AED` |
| Properties | Coral | `#FF6B4A` |
| Credit Sculpt | Emerald Green | `#10B981` |

### Brand Configuration

All brand settings are centralized in `src/config/brands.ts`:

```typescript
import { getBrand } from '@config/brands';

const brand = getBrand('properties');
// Returns: colors, logos, navigation, SEO config, contact info
```

## Key Design Patterns

### Fixed Island Pattern

Content is constrained to a max-width while backgrounds stretch full-width. This prevents text from becoming disproportionately large on ultrawide screens.

```css
.container-content {
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: 1rem;
}
```

### Typography Scaling

Typography scales responsively but **stops at the `lg` breakpoint** (1024px):

```css
/* Correct */
.hero-headline { @apply text-3xl lg:text-[44px]; }

/* Incorrect - continues scaling */
.hero-headline { @apply text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl; }
```

### Brand-Aware Components

Components accept a `brand` prop to apply correct accent colors:

```astro
<Button brand="properties" variant="primary">Partner With Us</Button>
<Header brand="capital" currentPath="/about" />
```

## Page Routes

### Production Routes (via custom domains)

| Domain | Route | Page |
|--------|-------|------|
| growthwaveadvisors.com | `/` | Advisors Homepage |
| growthwaveadvisors.com | `/about` | Advisors About |
| growthwavecapital.com | `/` | Capital Homepage |
| growthwaveproperties.com | `/approach` | Properties Approach |

### Development Routes (localhost)

| Route | Page |
|-------|------|
| `/` | Hub/Chooser (dev only) |
| `/dev` | Style Guide Hub |
| `/dev/colors` | Color Reference |
| `/dev/typography` | Typography Reference |
| `/dev/components` | Component Reference |
| `/advisors` | Advisors Homepage |
| `/capital` | Capital Homepage |
| `/properties` | Properties Homepage |

## Development Workflow

### Creating a New Page

1. Create the `.astro` file in the appropriate brand directory:
   ```
   src/pages/properties/new-page.astro
   ```

2. Import and use the BaseLayout with the correct brand:
   ```astro
   ---
   import BaseLayout from '@layouts/BaseLayout.astro';
   import Header from '@components/Header.astro';
   import Footer from '@components/Footer.astro';
   
   const brand = 'properties' as const;
   ---
   
   <BaseLayout brand={brand} title="Page Title">
     <Header brand={brand} currentPath="/new-page" />
     <main>
       <!-- Page content -->
     </main>
     <Footer brand={brand} />
   </BaseLayout>
   ```

### Adding a New Component

1. Create the component in `src/components/`
2. Accept `brand` prop if it needs accent color theming
3. Import brand config: `import { getBrand } from '@config/brands';`
4. Document usage in `/dev/components`

### Modifying Brand Configuration

Edit `src/config/brands.ts` to update:
- Navigation items
- SEO metadata
- Contact information
- Color overrides

## Style Guide

Access the internal style guide at `/dev` during development:

- **Colors:** `/dev/colors` - Full color palette with CSS variables
- **Typography:** `/dev/typography` - Type scale and font weights
- **Components:** `/dev/components` - Interactive component demos

> Note: Style guide pages have `noindex` meta tags and won't appear in search results.

## Deployment

### Netlify Configuration

The site is deployed to Netlify with custom domain routing:

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x

2. **Domain Configuration:**
   - Each brand domain points to its respective route via redirect rules

### Environment Variables

No environment variables are required for the current build.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Create a feature branch from `main`
2. Make changes following existing patterns
3. Test across all three brand contexts
4. Submit a pull request

### Code Style

- Use TypeScript for type safety
- Follow existing component patterns
- Use Tailwind classes over custom CSS where possible
- Document complex components with JSDoc comments

## License

Proprietary - All rights reserved.

---

## Quick Reference

### CSS Custom Properties

```css
--color-ocean-blue: #265077;
--color-dark-navy: #022140;
--color-wave-cyan: #51A7F8;
--color-properties-coral: #FF6B4A;
--color-capital-purple: #7C3AED;
--color-credit-green: #10B981;
```

### Path Aliases

```typescript
@components  → src/components
@layouts     → src/layouts
@config      → src/config
@styles      → src/styles
@brand-types → src/types
```

### Common Tailwind Classes

```css
.bg-gradient-hero    /* Dark navy → Ocean blue gradient */
.nav-link            /* Center-grow underline effect */
.container-content   /* Responsive content container */
.arrow-reveal        /* Button arrow animation */
```
