// app/nearby/page.tsx - Show entities sorted by distance from user
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, TestTube } from 'lucide-react';
import EntityCardUnified from '@/components/EntityCardUnified';
import { Entity } from '@/data/db';

// Interface for Entity with distance
interface EntityWithDistance extends Entity {
  distance: number;
}

// TEST LOCATIONS for development (when not in Bali)
const TEST_LOCATIONS = [
  { name: 'Чангу', lat: -8.6478, lng: 115.1395, emoji: '🏄' },
  { name: 'Семиньяк', lat: -8.6905, lng: 115.1635, emoji: '🍸' },
  { name: 'Убуд', lat: -8.5069, lng: 115.2625, emoji: '🌿' },
  { name: 'Санур', lat: -8.6938, lng: 115.2614, emoji: '🌅' },
  { name: 'Кута', lat: -8.7184, lng: 115.1687, emoji: '🏖️' },
  { name: 'Нуса Дуа', lat: -8.8027, lng: 115.2282, emoji: '⭐' },
  { name: 'Улувату', lat: -8.8290, lng: 115.0844, emoji: '🌊' },
  { name: 'Денпасар', lat: -8.6569, lng: 115.2165, emoji: '🏛️' },
];

// FUNCTION: Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

function NearbyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get coordinates from URL
  const userLat = parseFloat(searchParams.get('lat') || '0');
  const userLng = parseFloat(searchParams.get('lng') || '0');
  
  const [entities, setEntities] = useState<(Entity & { distance: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTestLocations, setShowTestLocations] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');

  // Category filters
  const categories = [
    { value: '', label: 'Все', emoji: '🌟' },
    { value: 'service', label: 'Аренда', emoji: '🏍️' },
    { value: 'place', label: 'Еда & Spa', emoji: '🍽️' },
    { value: 'specialist', label: 'Специалисты', emoji: '👥' },
    { value: 'realtor', label: 'Недвижимость', emoji: '🏠' },
  ];

  useEffect(() => {
    if (userLat && userLng) {
      loadNearbyEntities();
    } else {
      // No coordinates - stop loading and show location selector
      setLoading(false);
    }
  }, [userLat, userLng, selectedType]);

  const loadNearbyEntities = async () => {
    setLoading(true);
    try {
      // Fetch all entities
      const response = await fetch('/api/entities?limit=1000');
      const data = await response.json();
      let allEntities = data.entities || [];

      // Filter by type if selected
      if (selectedType) {
        allEntities = allEntities.filter((e: Entity) => e.type === selectedType);
      }

      // Calculate distance for each entity and filter those with coordinates
      const entitiesWithDistance = allEntities
        .filter((entity: Entity) => entity.geo_lat && entity.geo_lng)
        .map((entity: Entity) => ({
          ...entity,
          distance: calculateDistance(
            userLat,
            userLng,
            entity.geo_lat!,
            entity.geo_lng!
          ),
        }))
        // Sort by distance (closest first)
        .sort((a: EntityWithDistance, b: EntityWithDistance) => a.distance - b.distance);

      setEntities(entitiesWithDistance);
    } catch (error) {
      console.error('Failed to load nearby entities:', error);
    } finally {
      setLoading(false);
    }
  };

  // FUNCTION: Handle test location selection
  const handleTestLocation = (lat: number, lng: number) => {
    router.push(`/nearby?lat=${lat}&lng=${lng}&test=true`);
    setShowTestLocations(false);
  };

  // Check if this is a test location
  const isTestMode = searchParams.get('test') === 'true';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <MapPin size={24} className="text-primary" />
                <h1 className="text-2xl font-display font-bold text-gray-900">
                  Рядом со мной
                </h1>
                {isTestMode && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                    ТЕСТ
                  </span>
                )}
              </div>
            </div>

            {/* Test Location Selector */}
            <div className="relative">
              <button
                onClick={() => setShowTestLocations(!showTestLocations)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm font-medium"
                title="Выбрать тестовую локацию"
              >
                <TestTube size={18} />
                <span className="hidden sm:inline">Тест локации</span>
              </button>

              {/* Dropdown Menu */}
              {showTestLocations && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowTestLocations(false)}
                  />
                  
                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-40">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-500 uppercase">
                        Выберите район
                      </p>
                    </div>
                    {TEST_LOCATIONS.map((location) => (
                      <button
                        key={location.name}
                        onClick={() => handleTestLocation(location.lat, location.lng)}
                        className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                      >
                        <span className="text-2xl">{location.emoji}</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            {location.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Category Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedType(cat.value)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                transition-all font-medium text-sm
                ${selectedType === cat.value
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-card'
                }
              `}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <p className="text-gray-600 mb-6">
          Места отсортированы по расстоянию от вас
        </p>

        {loading ? (
          /* Loading State */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="skeleton h-48"></div>
                <div className="p-5 space-y-3">
                  <div className="skeleton h-6 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !userLat || !userLng ? (
          /* No Location - Prompt to select area */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-8 shadow-card max-w-md mx-auto">
              <MapPin size={64} className="text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Выберите район
              </h2>
              <p className="text-gray-600 mb-6">
                Для отображения мест рядом с вами выберите район из списка выше
              </p>
              <button
                onClick={() => setShowTestLocations(true)}
                className="w-full bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Выбрать район
              </button>
            </div>
          </div>
        ) : entities.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <MapPin size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Нет мест поблизости
            </h2>
            <p className="text-gray-600">
              Попробуйте расширить радиус поиска
            </p>
          </div>
        ) : (
          /* Entities List */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {entities.map((entity, idx) => (
              <div
                key={entity.id}
                className="animate-slide-up relative"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Distance Badge */}
                <div className="absolute top-4 right-4 z-20 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  📍 {entity.distance} км
                </div>
                
                <EntityCardUnified entity={entity} variant="gallery" />
              </div>
            ))}
          </div>
        )}

        {/* Total Count */}
        {entities.length > 0 && (
          <div className="mt-6 text-center text-gray-500">
            Найдено мест: {entities.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NearbyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Загрузка...</p>
        </div>
      </div>
    }>
      <NearbyContent />
    </Suspense>
  );
}
