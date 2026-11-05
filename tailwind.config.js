/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14110e',
        inksoft: '#2a241e',
        paper: '#f3eee6',
        paper2: '#e7e0d4',
        ember: '#e4583a',
        aurora: '#b7f3e4',
        pine: '#1f6f5b',
        gold: '#8d6b32',
        goldbright: '#f0d7b0',
        line: '#d9d0c3',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 50px -28px rgba(20, 17, 14, 0.45)',
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [],
};
