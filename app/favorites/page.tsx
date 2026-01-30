// app/favorites/page.tsx - Saved favorites with localStorage persistence
'use client';

import { useState, useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EntityCardUnified from '@/components/EntityCardUnified';
import { Entity } from '@/data/db';

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      // Load favorite IDs from localStorage
      const stored = localStorage.getItem('bali-explorer-favorites');
      const favoriteIds = stored ? JSON.parse(stored) : [];
      setFavorites(favoriteIds);

      if (favoriteIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch entities
      const promises = favoriteIds.map((id: string) =>
        fetch(`/api/entities/${id}`).then(r => r.json())
      );
      const results = await Promise.all(promises);
      
      const validEntities = results.filter(e => e && !e.error);
      setEntities(validEntities);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Heart size={24} className="text-red-500 fill-red-500" />
              <h1 className="text-2xl font-display font-bold text-gray-900">
                Избранное
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="skeleton h-48"></div>
                <div className="p-5 space-y-3">
                  <div className="skeleton h-6 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : entities.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Избранное пусто
            </h2>
            <p className="text-gray-600 mb-6">
              Добавляйте места нажимая на ❤️
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              Исследовать Бали
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Сохранено: {entities.length}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entities.map((entity, idx) => (
                <div key={entity.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <EntityCardUnified entity={entity} variant="gallery" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
