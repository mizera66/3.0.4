// components/NearbyButton.tsx - "Рядом со мной" with Geolocation
//
// WHAT THIS COMPONENT DOES:
// - Floating button that asks for user's location
// - Shows beautiful modal for any error
// - ALWAYS redirects to /nearby page (with or without coordinates)
//
// HOW IT WORKS:
// 1. User clicks "Рядом со мной" button
// 2. Browser asks permission for location
// 3. If success: redirects with coordinates
// 4. If error: shows modal with "Continue" button
// 5. User continues to /nearby page anyway (can select areas manually)

'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Loader, X, AlertTriangle, Wifi } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NearbyButtonProps {
  className?: string;
}

export default function NearbyButton({ className = '' }: NearbyButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'permission' | 'timeout' | 'unavailable'>('permission');

  const modalContent = {
    permission: {
      icon: AlertTriangle,
      title: 'Доступ к геолокации запрещен',
      message: 'Вы запретили доступ к вашему местоположению. Вы можете продолжить и выбрать район Бали вручную.',
      button: 'Выбрать район вручную'
    },
    timeout: {
      icon: Wifi,
      title: 'Слабый сигнал GPS',
      message: 'Не удалось определить ваше местоположение из-за слабого сигнала. Попробуйте выйти на улицу или продолжите без геолокации.',
      button: 'Продолжить без геолокации'
    },
    unavailable: {
      icon: AlertTriangle,
      title: 'Местоположение недоступно',
      message: 'Не удалось определить ваше местоположение. Проверьте, что GPS включен, или продолжите выбрав район вручную.',
      button: 'Выбрать район вручную'
    }
  };

  const handleNearbyClick = async () => {
    setIsLoading(true);

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setModalType('unavailable');
      setShowModal(true);
      setIsLoading(false);
      return;
    }

    try {
      // Request user's location
      navigator.geolocation.getCurrentPosition(
        // SUCCESS: Got user's location
        async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Save location to localStorage for future use
          localStorage.setItem(
            'user_location',
            JSON.stringify({ lat: userLat, lng: userLng })
          );

          // Redirect to nearby page with coordinates
          router.push(`/nearby?lat=${userLat}&lng=${userLng}`);
          setIsLoading(false);
        },
        // ERROR: User denied permission or error occurred
        (error) => {
          console.error('Geolocation error:', error);
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setModalType('permission');
              break;
            case error.TIMEOUT:
              setModalType('timeout');
              break;
            case error.POSITION_UNAVAILABLE:
              setModalType('unavailable');
              break;
            default:
              setModalType('unavailable');
          }
          
          setShowModal(true);
          setIsLoading(false);
        },
        // OPTIONS
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    } catch (err) {
      setModalType('unavailable');
      setShowModal(true);
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    // Always redirect to nearby page (without coordinates)
    router.push('/nearby');
  };

  const currentModal = modalContent[modalType];
  const IconComponent = currentModal.icon;

  return (
    <>
      <div className={className}>
        {/* Floating Button */}
        <button
          onClick={handleNearbyClick}
          disabled={isLoading}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-full
            bg-gradient-to-r from-primary to-bali-ocean
            text-white font-bold shadow-lg
            hover:shadow-xl transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-95
          `}
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin" />
              <span>Определяем...</span>
            </>
          ) : (
            <>
              <MapPin size={20} />
              <span>Рядом со мной</span>
            </>
          )}
        </button>
      </div>

      {/* Beautiful Error Modal - Rendered in portal */}
      {showModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-slide-up relative">
            {/* Close button inside modal */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-2xl">
                <IconComponent size={32} className="text-orange-600" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
              {currentModal.title}
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              {currentModal.message}
            </p>

            {/* Continue button */}
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-primary to-bali-ocean text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
            >
              {currentModal.button}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
