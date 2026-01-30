'use client';

import { Info, Shield, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function MorePage() {
  const menuItems = [
    {
      icon: Info,
      title: 'О проекте',
      description: 'История и миссия Bali Explorer',
      href: '/about',
    },
    {
      icon: MapPin,
      title: 'Районы Бали',
      description: 'Сравнение районов и выбор места',
      href: '/areas',
    },
    {
      icon: Shield,
      title: 'Админ-панель',
      description: 'Управление базой данных',
      href: '/admin',
    },
    {
      icon: Mail,
      title: 'Связаться',
      description: 'Предложения и вопросы',
      action: () => window.location.href = 'mailto:info@baliexplorer.com',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Ещё
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Mobile: 3 big buttons */}
        <div className="grid grid-cols-1 md:hidden gap-4">
          {menuItems.map((item) => (
            item.href ? (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white rounded-3xl shadow-card p-8 hover:shadow-card-hover transition-all text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-primary/10 p-6 rounded-2xl">
                    <item.icon size={40} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <button
                key={item.title}
                onClick={item.action}
                className="w-full bg-white rounded-3xl shadow-card p-8 hover:shadow-card-hover transition-all text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-primary/10 p-6 rounded-2xl">
                    <item.icon size={40} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </button>
            )
          ))}
        </div>

        {/* Desktop: horizontal cards */}
        <div className="hidden md:block space-y-3">
          {menuItems.map((item) => (
            item.href ? (
              <Link
                key={item.title}
                href={item.href}
                className="block bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <button
                key={item.title}
                onClick={item.action}
                className="w-full text-left bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </button>
            )
          ))}
        </div>

        {/* Version */}
        <div className="text-center text-gray-400 text-sm mt-12">
          Bali Explorer v3.0.6
          <br />
          Made with ❤️ for Bali community
        </div>
      </div>
    </div>
  );
}
