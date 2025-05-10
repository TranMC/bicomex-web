/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb', // blue-600
        'secondary': '#1e40af', // blue-800
        'accent': '#f59e0b', // amber-500
        'success': '#10b981', // emerald-500
        'warning': '#f59e0b', // amber-500
        'danger': '#ef4444', // red-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}