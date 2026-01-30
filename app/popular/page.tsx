'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EntityCardUnified from '@/components/EntityCardUnified';
import { Entity } from '@/data/db';

export default function PopularPage() {
  const router = useRouter();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/entities?popular=true&limit=50');
      const data = await res.json();
      setEntities(data.entities || []);
    } catch (error) {
      console.error('Failed to load popular:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <TrendingUp size={24} className="text-primary" />
              <h1 className="text-2xl font-display font-bold text-gray-900">
                Лучшее на этой неделе
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-gray-600 mb-6">
          Самые проверенные и популярные места на Бали по рейтингу доверия
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="skeleton h-48"></div>
                <div className="p-5 space-y-3">
                  <div className="skeleton h-6 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : entities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Нет данных</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entities.map((entity, idx) => (
              <div
                key={entity.id}
                className="animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <EntityCardUnified entity={entity} variant="gallery" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
