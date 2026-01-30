'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Guide, Entity } from '@/data/db';

export default function GuidePage() {
  const params = useParams();
  const router = useRouter();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [relatedEntities, setRelatedEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuide();
  }, [params.id]);

  const loadGuide = async () => {
    try {
      const res = await fetch(`/api/guides/${params.id}`);
      const data = await res.json();
      setGuide(data);

      // Load related entities
      if (data.related_entities && data.related_entities.length > 0) {
        const entitiesPromises = data.related_entities.map((id: string) =>
          fetch(`/api/entities/${id}`).then(r => r.json())
        );
        const entities = await Promise.all(entitiesPromises);
        setRelatedEntities(entities.filter(e => e && !e.error));
      }
    } catch (error) {
      console.error('Failed to load guide:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="skeleton h-8 w-3/4 mb-4"></div>
          <div className="skeleton h-64"></div>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Гайд не найден</h1>
          <button
            onClick={() => router.push('/guides')}
            className="text-primary hover:underline"
          >
            Вернуться к гайдам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Назад
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={24} className="text-primary" />
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
            {guide.category}
          </span>
        </div>
        
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
          {guide.title}
        </h1>

        {/* Content - Better typography for readability */}
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-8">
          <div
            className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed"
            style={{ fontSize: '15px', lineHeight: '1.7' }}
            dangerouslySetInnerHTML={{
              __html: guide.content
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/\n/g, '<br>')
                .replace(/^(.+)$/gm, '<p class="mb-3">$1</p>')
                .replace(/##\s(.+)/g, '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-900">$1</h2>')
                .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                .replace(/⚠️/g, '<span class="text-warning text-lg">⚠️</span>')
                .replace(/✅/g, '<span class="text-green-500">✅</span>')
                .replace(/❌/g, '<span class="text-red-500">❌</span>')
            }}
          />
        </div>

        {/* Related Entities */}
        {relatedEntities.length > 0 && (
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
              Проверенные места из гайда
            </h3>
            <div className="space-y-3">
              {relatedEntities.map(entity => (
                <Link
                  key={entity.id}
                  href={`/entity/${entity.id}`}
                  className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{entity.title}</h4>
                      <p className="text-sm text-gray-600">{entity.area}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= Math.floor(entity.rating) ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="text-center text-sm text-gray-500 mt-8">
          Последнее обновление: {new Date(guide.updated_at).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
