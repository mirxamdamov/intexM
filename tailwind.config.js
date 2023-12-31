/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        'footer-texture': "url('../../public/bg.png')"
    },
  },
  plugins: [],
}