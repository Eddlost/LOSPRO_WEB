/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#FDF8EF',
          100: '#FAF0D9',
          200: '#F5DDB5',
          300: '#EFCA99',
          400: '#E4AD6B',
          500: '#D9984F',
          600: '#CE8946',
          700: '#B87430',
          800: '#8B5A2B',
          900: '#5C3D1E',
        },
        navy: {
          600: '#1B3055',
          700: '#142444',
          800: '#0F1B30',
          900: '#090F1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
