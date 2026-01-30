import '../styles/globals.css'
import { ReactNode } from 'react'
import Navigation from '@/components/Navigation'
import MobileNav from '@/components/MobileNav'

export const metadata = {
  title: 'Bali Explorer - Практичный сервис для жизни на Бали',
  description: 'Проверенные места, сервисы и специалисты на Бали. Безопасно. Актуально. Без риска.',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-gray-50">
        {/* Main content with bottom padding for mobile nav */}
        <main className="min-h-screen pb-20 md:pb-0">
          {children}
        </main>
        
        {/* Desktop Navigation (top bar) - hidden on mobile */}
        <div className="hidden md:block">
          <Navigation />
        </div>
        
        {/* Mobile Navigation (bottom bar) - only on mobile/tablet */}
        <MobileNav />
      </body>
    </html>
  )
}
