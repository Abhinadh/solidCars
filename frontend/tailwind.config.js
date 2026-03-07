/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63946', // A vibrant red for premium sports feel
        secondary: '#1D3557', // Deep blue
        dark: '#111827', // Very dark gray for sleek backgrounds
        light: '#F3F4F6'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
