/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C9A84C',   // Warm gold – premium accent
        secondary: '#1A2B4A', // Deep navy – authority & trust
        dark: '#0F172A',      // Slate 900 – rich body text & headings
        light: '#F8F9FA',     // Off-white – clean backgrounds
        navy: '#1A2B4A',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
