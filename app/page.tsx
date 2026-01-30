'use client';

// Homepage - Hero section, category grid, popular places, and footer
import { useState, useEffect } from 'react';
import Link from 'next/link';
import EntityCardUnified from '@/components/EntityCardUnified';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import NearbyButton from '@/components/NearbyButton';
import { Entity } from '@/data/db';
import Image from 'next/image';

export default function HomePage() {
  const [popularPlaces, setPopularPlaces] = useState<Entity[]>([]);

  useEffect(() => {
    fetch('/api/entities?popular=true&limit=6')
      .then(res => res.json())
      .then(data => setPopularPlaces(data.entities));
  }, []);

  const categories = [
    { icon: '/bike.png', label: 'Аренда байков', href: '/category/service?tags=Аренда байков' },
    { icon: '/visa.png', label: 'Визы & Визаран', href: '/category/service?tags=Визы' },
    { icon: '/spa.png', label: 'Spa & Массаж', href: '/category/place?tags=Spa' },
    { icon: '/medicine.png', label: 'Медицина', href: '/category/specialist?tags=Медицина' },
    { icon: '/food.png', label: 'Кафе и Рестораны', href: '/category/place?tags=Кафе' },
    { icon: '/excursion.png', label: 'Экскурсии', href: '/category/service?tags=Экскурсии' },
    { icon: '/specialist.png', label: 'Специалисты', href: '/category/specialist' },
    { icon: '/guides.png', label: 'Гайды', href: '/guides' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-8 pb-8 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url(/bali-background.jpg)' }}
        ></div>
        {/* Gradient Overlay for readability - to gray-50 instead of white */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-gray-50"></div>
        
        <div className="relative max-w-2xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-2 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
            <h1 className="text-3xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-bali-ocean">
              BALI EXPLORER
            </h1>
          </div>
          <p className="text-sm md:text-xl text-white font-semibold mb-3 md:mb-4 drop-shadow-lg">
            Проверенные места и сервисы. Без риска.
          </p>

          {/* Search Bar with Autocomplete */}
          <div className="scale-[0.85]">
            <SearchAutocomplete />
          </div>
          
          {/* Nearby Button - extremely close */}
          <div className="mt-0 flex justify-center scale-[0.85]">
            <NearbyButton />
          </div>
        </div>
      </div>

      {/* Categories - match search width on desktop */}
      <div className="max-w-2xl mx-auto px-4 -mt-6 relative">
        <h2 className="text-lg md:text-2xl font-display font-bold text-gray-900 mb-3">
          Быстрый выбор
        </h2>
        {/* Quick Categories - 4 columns, perfectly square, icons smaller and higher */}
        <div className="grid grid-cols-4 gap-1.5 md:gap-3">
          {categories.map((cat, idx) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="card-interactive bg-white rounded-2xl shadow-card text-center hover:shadow-card-hover animate-scale-in aspect-square flex flex-col items-center justify-between py-2 md:py-3 relative"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Icon - smaller, positioned higher */}
              <div className="flex-1 flex items-center justify-center w-full px-2">
                <div className="w-12 h-12 md:w-14 md:h-14 relative">
                  <Image
                    src={cat.icon}
                    alt={cat.label}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              {/* Text - positioned lower with small gap */}
              <p className="font-medium text-gray-900 text-[10px] md:text-xs leading-tight text-center break-words px-1">
                {cat.label}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Places */}
      {popularPlaces.length > 0 && (
        <div className="max-w-6xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6 px-4">
            <h2 className="text-lg md:text-2xl font-display font-bold text-gray-900">
              Лучшее на этой неделе
            </h2>
            <Link href="/popular" className="text-primary font-medium hover:underline">
              Все →
            </Link>
          </div>
          
          {/* Horizontal scroll */}
          <div className="overflow-x-auto scrollbar-hide px-4">
            <div className="flex gap-4">
              {popularPlaces.map((entity, idx) => (
                <div
                  key={entity.id}
                  className="flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[calc(33.333%-1rem)] animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <EntityCardUnified entity={entity} variant="single" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Trust Banner */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-primary to-bali-ocean rounded-3xl p-6 md:p-8 text-white text-center shadow-xl">
          <h3 className="text-xl md:text-2xl font-display font-bold mb-3">
            Система доверия
          </h3>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Каждое место проверяется сообществом. Мы показываем только актуальную информацию и предупреждаем о рисках.
          </p>
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto">
            <div>
              <div className="text-2xl md:text-3xl font-bold">{popularPlaces.length * 10}+</div>
              <div className="text-xs md:text-sm text-white/80 mt-1">Проверенных мест</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">95%</div>
              <div className="text-xs md:text-sm text-white/80 mt-1">Актуальность</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">24/7</div>
              <div className="text-xs md:text-sm text-white/80 mt-1">Обновления</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-3 bg-gradient-to-r from-primary to-bali-ocean bg-clip-text text-transparent">
                BALI EXPLORER
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Проверенные места и сервисы на Бали. Система доверия от сообщества.
              </p>
              {/* Stats */}
              <div className="flex gap-4 text-xs">
                <div>
                  <div className="text-primary font-bold text-lg">240+</div>
                  <div className="text-gray-500">Мест</div>
                </div>
                <div>
                  <div className="text-primary font-bold text-lg">95%</div>
                  <div className="text-gray-500">Актуально</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold mb-4 text-white">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <span>→</span> Главная
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <span>→</span> Поиск
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <span>→</span> Гайды
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <span>→</span> Избранное
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold mb-4 text-white">Категории</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/category/service?tags=Аренда байков" className="text-gray-400 hover:text-primary transition-colors">
                    Аренда байков
                  </Link>
                </li>
                <li>
                  <Link href="/category/service?tags=Визы" className="text-gray-400 hover:text-primary transition-colors">
                    Визы & Визаран
                  </Link>
                </li>
                <li>
                  <Link href="/category/place?tags=Spa" className="text-gray-400 hover:text-primary transition-colors">
                    Spa & Массаж
                  </Link>
                </li>
                <li>
                  <Link href="/category/specialist" className="text-gray-400 hover:text-primary transition-colors">
                    Специалисты
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-bold mb-4 text-white">О проекте</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link href="/areas" className="text-gray-400 hover:text-primary transition-colors">
                    Районы Бали
                  </Link>
                </li>
                <li>
                  <a href="mailto:info@baliexplorer.com" className="text-gray-400 hover:text-primary transition-colors">
                    info@baliexplorer.com
                  </a>
                </li>
                <li>
                  <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors">
                    Админ-панель
                  </Link>
                </li>
              </ul>
              {/* Social placeholder */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary transition-colors cursor-pointer flex items-center justify-center">
                  <span className="text-xs">TG</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary transition-colors cursor-pointer flex items-center justify-center">
                  <span className="text-xs">IG</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Bali Explorer. Все права защищены.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                Сделано с <span className="text-red-500">❤️</span> на Бали
              </span>
              <span className="hidden md:inline">•</span>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">v3.0.6</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
