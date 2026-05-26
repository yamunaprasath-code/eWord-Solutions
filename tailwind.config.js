/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EBF3FF',
          100: '#CCE0FF',
          200: '#8FB9FF',
          300: '#5291FF',
          400: '#1564E8',
          500: '#003686',
          600: '#002D70',
          700: '#002358',
          800: '#001A42',
          900: '#00102B',
        },
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
    },
  },
  corePlugins: { preflight: false },
  plugins: [],
}
