'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EntityCardUnified from '@/components/EntityCardUnified';
import { Entity } from '@/data/db';

function CategoryContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const type = (params.type as string) || 'place';
  const tags = searchParams.get('tags')?.split(',').filter(t => t) || [];
  
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntities();
  }, [type, tags.join(',')]);

  const loadEntities = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('type', type);
      if (tags.length > 0) {
        queryParams.append('tags', tags.join(','));
      }

      const res = await fetch(`/api/entities?${queryParams}`);
      const data = await res.json();
      setEntities(data.entities || []);
    } catch (error) {
      console.error('Failed to load entities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (tags.length > 0) return tags[0];
    return type === 'place' ? 'Места' : type === 'service' ? 'Сервисы' : 'Специалисты';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              {getTitle()}
            </h1>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-6">
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
            <p className="text-gray-500 text-lg">Ничего не найдено</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Найдено: <span className="font-bold text-gray-900">{entities.length}</span>
              </p>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="p-4">Загрузка...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
