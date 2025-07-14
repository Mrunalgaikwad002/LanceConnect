/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: '#18394B',
        steelblue: '#4B6A7D',
        lightsteel: '#AFA19A',
        offwhite: '#F9F4F1',
      },
    },
  },
  plugins: [],
}