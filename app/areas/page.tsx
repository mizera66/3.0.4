'use client';

import { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Areas data - inline to avoid module resolution issues
interface Area {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  mentions: string;
  color: string;
  pros: string[];
  cons: string[];
  questions: string[];
  conclusion: string;
}

const areas: Area[] = [
  {
    id: 'canggu',
    emoji: '🟦',
    name: 'ЧАНГУ',
    tagline: 'База, но с перегрузом',
    mentions: '38-42%',
    color: 'bg-blue-500',
    pros: [
      'Всё рядом и удобно',
      'Легко познакомиться',
      'Кафе, серф, работа',
    ],
    cons: [
      'Пробки и шум',
      'Перенаселённость',
      '«Устал от Чангу»',
    ],
    questions: [
      'Где в Чангу тихо?',
      'Есть нормальные места НЕ туристические?',
      'Кто уже съехал и куда?',
    ],
    conclusion: 'Точка входа. Но часто — место, откуда хотят уехать.',
  },
  {
    id: 'ubud',
    emoji: '🟩',
    name: 'УБУД',
    tagline: 'Голова и спокойствие',
    mentions: '24-27%',
    color: 'bg-green-500',
    pros: [
      'Тишина и природа',
      'Лучше думается',
      'Концентрация',
    ],
    cons: [
      'Скучно',
      'Далеко от всего',
      'Слишком духовно',
    ],
    questions: [
      'Подойдёт ли для работы?',
      'Где жить, чтобы не было скучно?',
      'Кто переехал из Чангу — как ощущения?',
    ],
    conclusion: 'Апгрейд состояния, но не социальной жизни.',
  },
  {
    id: 'uluwatu',
    emoji: '🟥',
    name: 'УЛУВАТУ',
    tagline: 'Красиво, но не для всех',
    mentions: '15-18%',
    color: 'bg-red-500',
    pros: [
      'Виды на океан',
      'Простор',
      'Чувство свободы',
    ],
    cons: [
      'Неудобно без байка',
      'Всё далеко',
      'Мало сервисов',
    ],
    questions: [
      'Можно ли жить постоянно?',
      'Как там с магазинами?',
      'Не слишком изолировано?',
    ],
    conclusion: 'Осознанный выбор. Туда не попадают — туда переезжают.',
  },
  {
    id: 'seminyak',
    emoji: '🟨',
    name: 'СЕМИНЬЯК / КУТА',
    tagline: 'Прошлый этап',
    mentions: '6-8%',
    color: 'bg-yellow-500',
    pros: [],
    cons: [
      'Дорого',
      'Старо и туристично',
      'Не мой вайб',
    ],
    questions: [],
    conclusion: 'Для чата — не актуальный центр жизни.',
  },
  {
    id: 'sanur',
    emoji: '🟪',
    name: 'САНУР',
    tagline: 'Для семей и спокойствия',
    mentions: '5-7%',
    color: 'bg-purple-500',
    pros: [
      'Для семей с детьми',
      'Тихая жизнь',
      'Альтернатива шуму',
    ],
    cons: [],
    questions: [],
    conclusion: 'Нишевый район, не массовый интерес.',
  },
];

export default function AreasPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Memoize current area to prevent recalculation
  const currentArea = useMemo(() => areas[currentIndex], [currentIndex]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      handlePrev();
    }
  }, [touchStart, touchEnd]);

  const handleNext = useCallback(() => {
    if (currentIndex < areas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const goToArea = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Районы Бали
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Map */}
        <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/bali-map.png"
              alt="Карта Бали"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Swipeable Area Card */}
        <div
          className="bg-white rounded-2xl shadow-card overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{currentArea.emoji}</span>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentArea.name}
                </h2>
                <p className="text-lg text-gray-600 italic">
                  "{currentArea.tagline}"
                </p>
              </div>
              <span className={`px-3 py-1 ${currentArea.color} text-white rounded-full text-sm font-bold`}>
                📊 {currentArea.mentions}
              </span>
            </div>

            {/* Pros */}
            {currentArea.pros.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  {currentArea.id === 'seminyak' || currentArea.id === 'sanur' ? 'КОМУ ПОДХОДИТ:' : 'ЧТО НРАВИТСЯ:'}
                </h3>
                <ul className="space-y-1">
                  {currentArea.pros.map((pro, idx) => (
                    <li key={idx} className="text-gray-700 ml-6">
                      • {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {currentArea.cons.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  {currentArea.id === 'seminyak' ? 'КАК О НЁМ ГОВОРЯТ:' : 'ЧТО БЕСИТ:'}
                </h3>
                <ul className="space-y-1">
                  {currentArea.cons.map((con, idx) => (
                    <li key={idx} className="text-gray-700 ml-6">
                      • {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Questions */}
            {currentArea.questions.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>💬</span>
                  ТИПИЧНЫЕ ВОПРОСЫ:
                </h3>
                <div className="space-y-2">
                  {currentArea.questions.map((question, idx) => (
                    <p key={idx} className="text-gray-600 italic ml-6 text-sm">
                      "{question}"
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Conclusion */}
            <div className="pt-4 border-t border-gray-200">
              <p className="font-bold text-gray-900">
                📌 Вывод: <span className="font-normal">{currentArea.conclusion}</span>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Previous button */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`p-2 rounded-xl transition-colors ${
                  currentIndex === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {areas.map((area, idx) => (
                  <button
                    key={area.id}
                    onClick={() => goToArea(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={handleNext}
                disabled={currentIndex === areas.length - 1}
                className={`p-2 rounded-xl transition-colors ${
                  currentIndex === areas.length - 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Insight */}
        <div className="bg-gradient-to-br from-primary/10 to-bali-ocean/10 rounded-2xl p-6 mt-6 border-2 border-primary/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💡</span>
            ГЛАВНЫЙ ИНСАЙТ
          </h3>
          <p className="text-gray-700 mb-3">
            Люди не спрашивают <strong>"какой район лучше"</strong>
          </p>
          <p className="text-gray-700 mb-4">
            Они спрашивают:
          </p>
          <ul className="space-y-2 mb-4 ml-4">
            <li className="text-gray-700">• Где мне комфортнее сейчас?</li>
            <li className="text-gray-700">• Где меньше раздражения?</li>
            <li className="text-gray-700">• Где совпадает с моим этапом?</li>
          </ul>
          <div className="pt-4 border-t border-primary/20">
            <p className="text-lg font-bold text-gray-900">
              Типичный путь:
            </p>
            <p className="text-2xl font-bold text-primary mt-2">
              Чангу → Убуд / Улувату
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
