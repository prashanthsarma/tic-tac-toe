/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'animate-winner',
    'stroke-primary-fg',
    'stroke-secondary-fg',
    'fill-primary-fg',
    'fill-secondary-fg',
    // Complex selectors for animations
    '[&_svg_ellipse]:animate-winner',
    '[&_ellipse]:animate-winner',
    '[&_path]:animate-winner',
    '[&_svg_path]:animate-winner',
    '[&_text]:animate-winner',
    '[&_svg_stroke]:animate-winner',
    // Fallback selectors
    '[&_svg_ellipse]:stroke-[var(--primary-fg)]',
    '[&_path]:fill-[var(--primary-fg)]',
    '[&_text]:fill-[var(--primary-fg)]'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        'primary-fg': 'var(--primary-fg)',
        'secondary-fg': 'var(--secondary-fg)',
        'primary-bg': 'var(--primary-bg)',
        'secondary-bg': 'var(--secondary-bg)',
      },
      animation: {
        'strokeWin': 'strokeWin 0.8s ease-in-out forwards',
        'pathWin': 'pathWin 0.8s ease-in-out forwards',
        'winEllipse': 'winEllipse 0.8s ease-in-out forwards',
        'winner': 'winner 0.3s alternate-reverse infinite'
      },
      keyframes: {
        strokeWin: {
          '0%': { stroke: 'var(--primary-fg)', strokeOpacity: '1' },
          '33%': { stroke: 'var(--secondary-fg)', strokeOpacity: '0.7' },
          '66%': { stroke: 'var(--secondary-fg)', strokeOpacity: '1' },
          '100%': { stroke: 'var(--primary-fg)', strokeOpacity: '1' }
        },
        pathWin: {
          '0%': { fill: 'var(--primary-fg)', fillOpacity: '1' },
          '33%': { fill: 'var(--secondary-fg)', fillOpacity: '0.7' },
          '66%': { fill: 'var(--secondary-fg)', fillOpacity: '1' },
          '100%': { fill: 'var(--primary-fg)', fillOpacity: '1' }
        },
        winEllipse: {
          '0%': { fill: 'var(--secondary-bg)', opacity: '0.3' },
          '33%': { fill: 'var(--secondary-fg)', opacity: '0.7' },
          '66%': { fill: 'var(--secondary-fg)', opacity: '1' },
          '100%': { fill: 'var(--primary-fg)', opacity: '1' }
        },
        winner: {
          '0%': { color: 'var(--primary-fg)' },
          '100%': { color: 'var(--secondary-fg)' }
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}