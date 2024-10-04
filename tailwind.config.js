const { nextui } = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        danger: {
          DEFAULT: '#ff4d4f',
          '50': '#ffcccc',
          '100': '#ff9999',
          '200': '#ff6666',
          '300': '#ff3333',
          '400': '#ff1a1a',
          '500': '#ff4d4f',
          '600': '#e60000',
          '700': '#b30000',
          '800': '#800000',
          '900': '#4d0000',
        }
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

