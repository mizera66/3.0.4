'use client';

import { Home, Heart, BookOpen, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { icon: Home, label: 'Главная', href: '/' },
    { icon: Heart, label: 'Избранное', href: '/favorites' },
    { icon: BookOpen, label: 'Гайды', href: '/guides' },
    { icon: MoreHorizontal, label: 'Ещё', href: '/more' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                  active
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <item.icon size={24} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-xs ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
