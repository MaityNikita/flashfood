/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          100: '#fff7ed',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        red: {
          100: '#fee2e2',
          500: '#ef4444',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
        }
      }
    },
  },
  plugins: [],
} 