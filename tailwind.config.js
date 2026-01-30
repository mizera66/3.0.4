/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Mobile-first responsive breakpoints for modern smartphones
      screens: {
        'xs': '375px',  // iPhone SE, small phones
        'sm': '640px',  // Standard smartphones  
        'md': '768px',  // Tablets
        'lg': '1024px', // Laptops
        'xl': '1280px', // Desktops
        '2xl': '1536px',// Large desktops
      },
      colors: {
        primary: '#00A86B',
        secondary: '#FF6B35',
        trust: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        bali: {
          sand: '#F5E6D3',
          ocean: '#0A7EA4',
          jungle: '#2D5016',
          sunset: '#FF6B35',
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
