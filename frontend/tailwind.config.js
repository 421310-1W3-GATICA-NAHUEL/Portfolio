/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0B0C10',
          paper: '#1F2833',
        },
        primary: {
          DEFAULT: '#45A29E',
          light: '#66FCF1',
        },
        electric: {
          blue: '#3b82f6',
          violet: '#8b5cf6',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
