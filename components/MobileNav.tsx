// components/MobileNav.tsx - Bottom Navigation Bar for Mobile
//
// WHAT THIS COMPONENT DOES:
// - Shows a fixed navigation bar at the bottom of the screen on mobile
// - Contains 5 main navigation buttons: Home, Search, Favorites, Guides, Menu
// - Highlights the active page
// - Only visible on mobile/tablet (hidden on desktop)
//
// WHY BOTTOM NAVIGATION:
// - On mobile phones (especially large ones), the top of the screen is hard to reach
// - Bottom navigation is easier to tap with thumb
// - Standard pattern in mobile apps (Instagram, Twitter, etc.)
//
// HOW IT WORKS:
// - Uses Next.js usePathname() to detect current page
// - Highlights active button with colored icon and text
// - Fixed position at bottom with backdrop blur for modern look

'use client';

import { Home, Search, Heart, BookOpen, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  // Get current page path to highlight active button
  const pathname = usePathname();

  // NAVIGATION ITEMS: Define all bottom nav buttons
  const navItems = [
    {
      label: 'Главная',
      href: '/',
      icon: Home,
      // Active if exactly on homepage
      isActive: pathname === '/',
    },
    {
      label: 'Поиск',
      href: '/search',
      icon: Search,
      // Active if on search page
      isActive: pathname === '/search',
    },
    {
      label: 'Избранное',
      href: '/favorites',
      icon: Heart,
      // Active if on favorites page
      isActive: pathname === '/favorites',
    },
    {
      label: 'Гайды',
      href: '/guides',
      icon: BookOpen,
      // Active if on guides page or viewing a guide
      isActive: pathname.startsWith('/guide'),
    },
    {
      label: 'Ещё',
      href: '/more',
      icon: Menu,
      // Active if on more or about page
      isActive: pathname === '/more' || pathname === '/about',
    },
  ];

  return (
    <>
      {/* SPACER: Prevents content from being hidden behind fixed nav */}
      {/* Height matches the nav bar height (72px) */}
      <div className="h-18 md:hidden" aria-hidden="true" />

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around h-18 px-2">
          {/* Loop through all navigation items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center gap-1 
                  flex-1 h-full py-2 px-1
                  transition-all duration-200
                  ${
                    item.isActive
                      ? 'text-primary' // Active: colored
                      : 'text-gray-600 hover:text-gray-900' // Inactive: gray
                  }
                `}
              >
                {/* Icon */}
                <Icon 
                  size={24} 
                  className={item.isActive ? 'stroke-[2.5]' : 'stroke-[2]'}
                />
                
                {/* Label */}
                <span 
                  className={`
                    text-xs font-medium
                    ${item.isActive ? 'font-bold' : 'font-normal'}
                  `}
                >
                  {item.label}
                </span>
                
                {/* Active indicator dot (optional visual enhancement) */}
                {item.isActive && (
                  <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
