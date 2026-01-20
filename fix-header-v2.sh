#!/bin/bash

echo "🔧 Fixing Header.astro with static Tailwind classes..."

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
    nav: [
      { label: 'About', href: '/properties/about' },
      { label: 'Investment Approach', href: '/properties/approach' },
      { label: 'Portfolio', href: '/properties/portfolio' },
      { label: 'Contact', href: '/properties/contact' },
    ],
  },
  capital: {
    name: 'Capital',
    nav: [
      { label: 'About', href: '/capital/about' },
      { label: 'Services', href: '/capital/services' },
      { label: 'Contact', href: '/capital/contact' },
    ],
  },
  advisors: {
    name: 'Advisors',
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
          {brand === 'properties' && (
            <span class="text-xs font-medium uppercase tracking-wider leading-tight text-properties-coral">
              Properties
            </span>
          )}
          {brand === 'capital' && (
            <span class="text-xs font-medium uppercase tracking-wider leading-tight text-capital-purple">
              Capital
            </span>
          )}
          {brand === 'advisors' && (
            <span class="text-xs font-medium uppercase tracking-wider leading-tight text-ocean-blue">
              Advisors
            </span>
          )}
        </div>
      </a>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex items-center space-x-8">
        {config.nav.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <li>
              {brand === 'properties' && (
                
                  href={item.href}
                  class={isActive 
                    ? "font-medium text-base text-properties-coral border-b-2 border-properties-coral pb-1 transition-colors"
                    : "font-medium text-base text-neutral-gray hover:text-dark-navy transition-colors"
                  }
                >
                  {item.label}
                </a>
              )}
              {brand === 'capital' && (
                
                  href={item.href}
                  class={isActive 
                    ? "font-medium text-base text-capital-purple border-b-2 border-capital-purple pb-1 transition-colors"
                    : "font-medium text-base text-neutral-gray hover:text-dark-navy transition-colors"
                  }
                >
                  {item.label}
                </a>
              )}
              {brand === 'advisors' && (
                
                  href={item.href}
                  class={isActive 
                    ? "font-medium text-base text-ocean-blue border-b-2 border-ocean-blue pb-1 transition-colors"
                    : "font-medium text-base text-neutral-gray hover:text-dark-navy transition-colors"
                  }
                >
                  {item.label}
                </a>
              )}
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
              {brand === 'properties' && (
                
                  href={item.href}
                  class={isActive
                    ? "block py-2 px-4 rounded-lg bg-properties-coral bg-opacity-10 text-properties-coral font-medium transition-colors"
                    : "block py-2 px-4 rounded-lg text-neutral-gray hover:bg-gray-50 transition-colors"
                  }
                >
                  {item.label}
                </a>
              )}
              {brand === 'capital' && (
                
                  href={item.href}
                  class={isActive
                    ? "block py-2 px-4 rounded-lg bg-capital-purple bg-opacity-10 text-capital-purple font-medium transition-colors"
                    : "block py-2 px-4 rounded-lg text-neutral-gray hover:bg-gray-50 transition-colors"
                  }
                >
                  {item.label}
                </a>
              )}
              {brand === 'advisors' && (
                
                  href={item.href}
                  class={isActive
                    ? "block py-2 px-4 rounded-lg bg-ocean-blue bg-opacity-10 text-ocean-blue font-medium transition-colors"
                    : "block py-2 px-4 rounded-lg text-neutral-gray hover:bg-gray-50 transition-colors"
                  }
                >
                  {item.label}
                </a>
              )}
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

echo "✅ Header.astro fixed with static Tailwind classes!"
echo ""
echo "📋 Next steps:"
echo "1. Restart dev server (if running)"
echo "2. Hard refresh browser: Cmd+Shift+R"
echo "3. Check header navigation"
