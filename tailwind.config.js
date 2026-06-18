/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Theme colors are driven by CSS variables so the admin panel can
      // recolor the whole app at runtime. The variables hold space-separated
      // RGB channels (e.g. "99 102 241") so Tailwind's <alpha-value> works.
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          soft: 'rgb(var(--color-primary) / 0.12)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          soft: 'rgb(var(--color-secondary) / 0.12)',
        },
      },
      fontFamily: {
        sans: 'var(--font-sans, ui-sans-serif, system-ui, sans-serif)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        'glass-lg': '0 20px 60px -10px rgba(31, 38, 135, 0.25)',
        glow: '0 0 40px -8px rgb(var(--color-primary) / 0.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
