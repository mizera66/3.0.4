'use client';

import { useState, useEffect } from 'react';
import { Book, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Guide } from '@/data/db';

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      const res = await fetch('/api/guides');
      const data = await res.json();
      setGuides(data.guides || []);
    } catch (error) {
      console.error('Failed to load guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(guides.map(g => g.category)));
  const filteredGuides = selectedCategory
    ? guides.filter(g => g.category === selectedCategory)
    : guides;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Гайды
          </h1>
          <p className="text-gray-600">
            Практические инструкции для жизни на Бали
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Все
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guides List */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card p-6">
                <div className="skeleton h-6 w-3/4 mb-2"></div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredGuides.length === 0 ? (
          <div className="text-center py-12">
            <Book size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Гайдов пока нет</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGuides.map((guide, idx) => (
              <Link
                key={guide.id}
                href={`/guide/${guide.id}`}
                className="block bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-all animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                        {guide.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Обновлено: {new Date(guide.updated_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <ChevronRight size={24} className="text-gray-400 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
