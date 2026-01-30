'use client';

import { ArrowLeft, Target, Users, Shield, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Назад
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            О проекте
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bali Explorer — это не просто каталог мест. Это система доверия, построенная сообществом для сообщества.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Target size={32} className="text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Наша миссия
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Мы создали Bali Explorer, потому что устали от хаоса в чатах, устаревших советов и случайных контактов. 
                Каждый, кто приезжает на Бали, сталкивается с одними и теми же вопросами: где арендовать байк без обмана? 
                Какому врачу можно доверять? Куда не стоит ходить?
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Мы решили эту проблему системно. Вместо того чтобы спрашивать в десятый раз в чате, теперь есть один источник, 
            где информация проверена, структурирована и постоянно обновляется.
          </p>

          <p className="text-gray-700 leading-relaxed">
            <strong>Главное отличие</strong> — мы не просто показываем места. Мы показываем их рейтинг доверия, 
            актуальность информации и предупреждаем о рисках. Каждый пользователь может подтвердить или опровергнуть 
            информацию, и система автоматически обновляет рейтинги.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="bg-trust/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Shield size={28} className="text-trust" />
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
              Доверие
            </h3>
            <p className="text-gray-600 text-sm">
              Каждое место проверяется сообществом. Мы не берём деньги за размещение и не скрываем негативные отзывы.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Zap size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
              Скорость
            </h3>
            <p className="text-gray-600 text-sm">
              Находите нужное за секунды, а не часы. Умный поиск, фильтры и актуальная информация всегда под рукой.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Users size={28} className="text-secondary" />
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
              Сообщество
            </h3>
            <p className="text-gray-600 text-sm">
              Мы растём вместе. Каждый может предложить новое место, подтвердить актуальность или предупредить о проблемах.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-primary/5 to-bali-ocean/5 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
            Как это работает?
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Проверенные места</h4>
                <p className="text-gray-700 text-sm">
                  Мы добавляем только те места, которые сами проверили или которые рекомендовало сообщество.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Система доверия</h4>
                <p className="text-gray-700 text-sm">
                  Каждое место имеет рейтинг от 0 до 100%. Пользователи подтверждают актуальность или жалуются на проблемы.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Автоматическое обновление</h4>
                <p className="text-gray-700 text-sm">
                  Если место получает жалобы, его рейтинг падает. Если давно не подтверждали — помечаем как устаревшее.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Прозрачность</h4>
                <p className="text-gray-700 text-sm">
                  Вы всегда видите, когда информация была обновлена последний раз и сколько человек её подтвердили.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 text-center">
            Команда
          </h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-6">
            Мы — небольшая команда энтузиастов, которые живут на Бали и знают все его подводные камни. 
            Наша цель — сделать жизнь экспатов проще и безопаснее.
          </p>
          <p className="text-gray-600 text-sm text-center">
            Проект запущен в январе 2026 и активно развивается. Мы открыты для предложений и сотрудничества.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-primary to-bali-ocean rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-display font-bold mb-3">
            Есть идеи или предложения?
          </h3>
          <p className="text-white/90 mb-6">
            Мы всегда рады обратной связи. Свяжитесь с нами удобным способом:
          </p>
          
          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <a
              href="https://t.me/mlzera"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.333-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.305.02.469z"/>
              </svg>
              Telegram
            </a>
            <a
              href="mailto:admin@baliexplorer.com"
              className="flex-1 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Email
            </a>
          </div>
          
          <p className="text-white/70 text-sm mt-4">
            Telegram: @mlzera • Email: admin@baliexplorer.com
          </p>
        </div>
      </div>
    </div>
  );
}
