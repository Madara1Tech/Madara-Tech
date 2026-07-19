/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  // Safelist classes that are used only via @apply in CSS
  safelist: [
    'text-4xl',
    'text-3xl',
    'text-2xl',
    'text-xl',
    'text-lg',
    'text-base',
    'text-sm',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}