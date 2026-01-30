'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import EntityCardUnified from '@/components/EntityCardUnified';
import { Entity } from '@/data/db';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    area: '',
    type: '',
    priceLevel: '',
  });

  useEffect(() => {
    loadEntities();
  }, [searchQuery, filters]);

  const loadEntities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (filters.area) params.append('area', filters.area);
      if (filters.type) params.append('type', filters.type);

      const res = await fetch(`/api/entities?${params}`);
      const data = await res.json();
      setEntities(data.entities || []);
    } catch (error) {
      console.error('Failed to load entities:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ area: '', type: '', priceLevel: '' });
    setShowFilters(false);
  };

  const areas = ['Чангу', 'Семиньяк', 'Убуд', 'Улувату', 'Денпасар', 'Санур'];
  const types = [
    { value: 'place', label: 'Места' },
    { value: 'service', label: 'Сервисы' },
    { value: 'specialist', label: 'Специалисты' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-xl transition-all ${
                showFilters
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter size={20} />
            </button>
          </div>

          {/* Active Filters Pills */}
          {(filters.area || filters.type) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {filters.area && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                  📍 {filters.area}
                  <button
                    onClick={() => setFilters({ ...filters, area: '' })}
                    className="hover:text-primary/70"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {filters.type && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                  {types.find(t => t.value === filters.type)?.label}
                  <button
                    onClick={() => setFilters({ ...filters, type: '' })}
                    className="hover:text-primary/70"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 animate-slide-up">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Фильтры</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Очистить всё
              </button>
            </div>

            {/* Area Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Район
              </label>
              <div className="flex flex-wrap gap-2">
                {areas.map(area => (
                  <button
                    key={area}
                    onClick={() => setFilters({ ...filters, area: filters.area === area ? '' : area })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filters.area === area
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тип
              </label>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setFilters({ ...filters, type: filters.type === type.value ? '' : type.value })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filters.type === type.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-gray-900">
            {loading 
              ? 'Загрузка...' 
              : searchQuery 
                ? `Найдено: ${entities.length}` 
                : 'Рекомендации'}
          </h2>
        </div>

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
            <p className="text-gray-400 text-sm mt-2">Попробуйте изменить фильтры или запрос</p>
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4">Загрузка...</div>}>
      <SearchContent />
    </Suspense>
  );
}
