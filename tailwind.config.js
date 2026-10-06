/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#0a0e1a',
          900: '#0d1320',
          850: '#111827',
          800: '#1a2234',
          700: '#243044',
          600: '#2f3d54',
          500: '#3b4a63',
          400: '#4a5b76',
          300: '#6b7a94',
          200: '#8b9ab5',
        },
        gold: {
          700: '#a07e2e',
          600: '#b8943f',
          500: '#c9a84c',
          400: '#d4b85f',
          300: '#e0c977',
          200: '#ecd9a0',
          100: '#f4e8c4',
        },
        cream: '#f5f1ea',
      },
      letterSpacing: {
        luxe: '0.22em',
        'wide-2': '0.12em',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
