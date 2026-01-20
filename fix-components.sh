#!/bin/bash

# GrowthWave Components Fix Script
# Fixes Header, Footer, and Button components

set -e  # Exit on any error

echo "🔧 GrowthWave Components Fix Script"
echo "=================================="
echo ""

# Check we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Must run from project root (where package.json is)"
  exit 1
fi

echo "📁 Backing up existing components..."
mkdir -p .backups
cp src/components/shared/Header.astro .backups/Header.astro.backup 2>/dev/null || true
cp src/components/shared/Button.astro .backups/Button.astro.backup 2>/dev/null || true
cp src/components/shared/Footer.astro .backups/Footer.astro.backup 2>/dev/null || true
echo "✅ Backups created in .backups/"
echo ""

echo "🔨 Fixing Button.astro..."
cat > src/components/shared/Button.astro << 'BUTTON_EOF'
---
// src/components/shared/Button.astro
interface Props {
  href?: string;
  brand: 'properties' | 'capital' | 'advisors';
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const {
  href,
  brand,
  variant = 'primary',
  size = 'md',
  class: className = '',
} = Astro.props;

// Brand color configurations
const brandColors = {
  properties: {
    primary: 'bg-properties-coral hover:bg-opacity-90 text-white',
    secondary: 'bg-white text-properties-coral border-2 border-properties-coral hover:bg-properties-coral hover:text-white',
  },
  capital: {
    primary: 'bg-capital-purple hover:bg-opacity-90 text-white',
    secondary: 'bg-white text-capital-purple border-2 border-capital-purple hover:bg-capital-purple hover:text-white',
  },
  advisors: {
    primary: 'bg-ocean-blue hover:bg-opacity-90 text-white',
    secondary: 'bg-white text-ocean-blue border-2 border-ocean-blue hover:bg-ocean-blue hover:text-white',
  },
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const colorClasses = brandColors[brand][variant];
const baseClasses = 'inline-block font-semibold rounded-lg transition-all duration-200 text-center no-underline';
const classes = `${baseClasses} ${sizeClasses[size]} ${colorClasses} ${className}`;
---

{href ? (
  <a href={href} class={classes}>
    <slot />
  </a>
) : (
  <button class={classes}>
    <slot />
  </button>
)}
BUTTON_EOF
echo "✅ Button.astro fixed"
echo ""

echo "🔨 Fixing Header.astro..."
cat > src/components/shared/Header.astro << 'HEADER_EOF'
---
// src/components/shared/Header.astro
interface Props {
  brand: 'properties' | 'capital' | 'advisors';
  currentPath?: string;
}

const { brand, currentPath = '' } = Astro.props;

const brandConfig = {
  properties: {
    name: 'Properties',
    accentColor: 'properties-coral',
    nav: [
      { label: 'About', href: '/properties/about' },
      { label: 'Investment Approach', href: '/properties/approach' },
      { label: 'Portfolio', href: '/properties/portfolio' },
      { label: 'Contact', href: '/properties/contact' },
    ],
  },
  capital: {
    name: 'Capital',
    accentColor: 'capital-purple',
    nav: [
      { label: 'About', href: '/capital/about' },
      { label: 'Services', href: '/capital/services' },
      { label: 'Contact', href: '/capital/contact' },
    ],
  },
  advisors: {
    name: 'Advisors',
    accentColor: 'ocean-blue',
    nav: [
      { label: 'About', href: '/advisors/about' },
      { label: 'Our Companies', href: '/advisors/companies' },
      { label: 'Investor Success Flywheel™', href: '/advisors/flywheel' },
      { label: 'Contact', href: '/advisors/contact' },
    ],
  },
};

const config = brandConfig[brand];
---

<header class="bg-white shadow-sm sticky top-0 z-50">
  <nav class="container-custom">
    <div class="flex items-center justify-between py-4">
      <!-- Logo -->
      <a href={`/${brand}`} class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        <div class="flex flex-col">
          <span class="text-xl font-bold text-ocean-blue leading-tight">GrowthWave</span>
          <span class={`text-xs font-medium uppercase tracking-wider leading-tight text-${config.accentColor}`}>
            {config.name}
          </span>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex items-center space-x-8">
        {config.nav.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <li>
              
                href={item.href}
                class={`font-medium text-base transition-colors ${
                  isActive 
                    ? `text-${config.accentColor} border-b-2 border-${config.accentColor} pb-1` 
                    : 'text-neutral-gray hover:text-dark-navy'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <!-- Mobile Menu Button -->
      <button
        id="mobile-menu-button"
        class="md:hidden p-2 text-neutral-gray hover:text-dark-navy focus:outline-none"
        aria-label="Toggle menu"
        aria-expanded="false"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div id="mobile-menu" class="hidden md:hidden pb-4">
      <ul class="space-y-2">
        {config.nav.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <li>
              
                href={item.href}
                class={`block py-2 px-4 rounded-lg transition-colors ${
                  isActive
                    ? `bg-${config.accentColor} bg-opacity-10 text-${config.accentColor} font-medium`
                    : 'text-neutral-gray hover:bg-gray-50'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </nav>
</header>

<script>
  const button = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  button?.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isExpanded));
    menu?.classList.toggle('hidden');
  });
</script>
HEADER_EOF
echo "✅ Header.astro fixed"
echo ""

echo "🔨 Fixing Footer.astro..."
cat > src/components/shared/Footer.astro << 'FOOTER_EOF'
---
// src/components/shared/Footer.astro
interface Props {
  brand: 'properties' | 'capital' | 'advisors';
}

const { brand } = Astro.props;
const currentYear = new Date().getFullYear();

const brandConfig = {
  properties: {
    name: 'GrowthWave Properties',
    tagline: 'Building Wealth Through Real Estate',
    description: 'Strategic multifamily partnerships in the Midwest.',
  },
  capital: {
    name: 'GrowthWave Capital',
    tagline: 'Fueling Your Business Growth',
    description: 'Business financing for real estate investors.',
  },
  advisors: {
    name: 'GrowthWave Advisors',
    tagline: 'Integrated Financial Services for Real Estate Investors',
    description: 'Credit optimization, business financing, and real estate investments—all in one platform.',
  },
};

const config = brandConfig[brand];
---

<footer class="bg-dark-navy text-white mt-auto">
  <div class="container-custom py-12">
    <!-- Main Footer Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      <!-- Brand Column -->
      <div class="lg:col-span-2">
        <h3 class="text-2xl font-bold text-white mb-2">{config.name}</h3>
        <p class="text-gray-300 mb-3 font-medium">{config.tagline}</p>
        <p class="text-gray-400 text-sm">{config.description}</p>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="font-semibold text-white mb-4">Quick Links</h4>
        <ul class="space-y-2">
          <li>
            <a href={`/${brand}/about`} class="text-gray-300 hover:text-white transition-colors text-sm">
              About
            </a>
          </li>
          {brand === 'properties' && (
            <>
              <li>
                <a href="/properties/approach" class="text-gray-300 hover:text-white transition-colors text-sm">
                  Investment Approach
                </a>
              </li>
              <li>
                <a href="/properties/portfolio" class="text-gray-300 hover:text-white transition-colors text-sm">
                  Portfolio
                </a>
              </li>
            </>
          )}
          {brand === 'capital' && (
            <li>
              <a href="/capital/services" class="text-gray-300 hover:text-white transition-colors text-sm">
                Services
              </a>
            </li>
          )}
          {brand === 'advisors' && (
            <>
              <li>
                <a href="/advisors/companies" class="text-gray-300 hover:text-white transition-colors text-sm">
                  Our Companies
                </a>
              </li>
              <li>
                <a href="/advisors/flywheel" class="text-gray-300 hover:text-white transition-colors text-sm">
                  Investor Success Flywheel™
                </a>
              </li>
            </>
          )}
          <li>
            <a href={`/${brand}/contact`} class="text-gray-300 hover:text-white transition-colors text-sm">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <!-- Other Divisions -->
      <div>
        <h4 class="font-semibold text-white mb-4">GrowthWave Ecosystem</h4>
        <ul class="space-y-2">
          {brand !== 'advisors' && (
            <li>
              <a href="https://growthwaveadvisors.com" class="text-gray-300 hover:text-white transition-colors text-sm">
                GrowthWave Advisors
              </a>
            </li>
          )}
          {brand !== 'properties' && (
            <li>
              <a href="https://growthwaveproperties.com" class="text-gray-300 hover:text-white transition-colors text-sm">
                GrowthWave Properties
              </a>
            </li>
          )}
          {brand !== 'capital' && (
            <li>
              <a href="https://growthwavecapital.com" class="text-gray-300 hover:text-white transition-colors text-sm">
                GrowthWave Capital
              </a>
            </li>
          )}
          <li>
            <a href="https://creditsculpt.com" class="text-gray-300 hover:text-white transition-colors text-sm">
              Credit Sculpt Services
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-700 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
        <p class="text-gray-400 text-sm">
          © {currentYear} GrowthWave Advisors LLC. All rights reserved.
        </p>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">
            Privacy Policy
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">
            Terms of Service
          </a>
        </div>
      </div>

      <!-- Legal Disclaimer -->
      <p class="text-gray-500 text-xs text-center md:text-left">
        {brand === 'properties' && 
          'Investment opportunities subject to availability and qualification. Past performance does not guarantee future results. All investments carry risk.'}
        {brand === 'capital' && 
          'GrowthWave Capital provides financing consulting and education services; we are not a lender or broker. Approval and terms subject to underwriting criteria.'}
        {brand === 'advisors' && 
          'Credit Sculpt Services operates under the Credit Repair Organizations Act (CROA). Investment opportunities are subject to qualification and accreditation requirements.'}
      </p>
    </div>
  </div>
</footer>
FOOTER_EOF
echo "✅ Footer.astro fixed"
echo ""

echo "=================================="
echo "✅ All components fixed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Restart dev server: npm run dev"
echo "2. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"
echo "3. Visit: http://localhost:4321/properties/about"
echo ""
echo "💾 Backups saved in .backups/ directory"
echo "=================================="