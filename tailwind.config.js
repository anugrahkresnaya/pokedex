/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'full-black': '#000000',
        'cetacean-blue': '#150050',
        'deep-violet': '#3F0071',
        'metallic-violet': '#610094'
      }
    },
  },
  plugins: [],
}

