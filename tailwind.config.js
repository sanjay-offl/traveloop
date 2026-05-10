/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#010302',
          surface: '#010302',
          card: 'rgba(1,3,2,0.70)',
          primary: '#52E3E8',
          accent: '#52E3E8',
          purple: '#8B5CF6',
          'accent-dim': 'rgba(82,227,232,0.15)',
          'purple-dim': 'rgba(139,92,246,0.12)',
          // Legacy aliases for compatibility
          cyan: '#52E3E8',
          'cyan-dim': 'rgba(82,227,232,0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(82,227,232,0.15)',
        'glow-md': '0 0 30px rgba(82,227,232,0.20)',
        'glow-lg': '0 0 60px rgba(82,227,232,0.25)',
        'glow-purple': '0 0 30px rgba(139,92,246,0.15)',
        'card-hover': '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(82,227,232,0.10)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-right': 'slideRight 0.6s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'glow-breathe': 'glowBreathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 10px rgba(82,227,232,0.4)' },
          '50%': { textShadow: '0 0 30px rgba(82,227,232,0.9), 0 0 60px rgba(82,227,232,0.4)' },
        },
        glowBreathe: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
