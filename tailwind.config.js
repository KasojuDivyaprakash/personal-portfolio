/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#050816',
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
      },
      boxShadow: {
        glow: '0 0 40px rgba(99, 102, 241, 0.25)',
      },
    },
  },
  plugins: [],
}
