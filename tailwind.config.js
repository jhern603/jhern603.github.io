/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        bg: {
          light: '#243448',
          dark: '#1A2838',
        },
        surface: {
          light: '#1C2D3E',
          dark: '#162230',
        },
        primary: {
          light: '#E8EDF2',
          dark: '#E8EDF2',
        },
        accent: '#5BB8D4',
        muted: {
          light: '#7A95AB',
          dark: '#7A95AB',
        },
        border: '#3A5170',
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        pulse_dot: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
