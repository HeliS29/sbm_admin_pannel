/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          50: "#EEEDFD",
          100: "#DEDCFC",
          200: "#BDB9F9",
          300: "#9C96F7",
          400: "#7B73F4",
          500: "#4F46E5",
          600: "#3730E0",
          700: "#2622C5",
          800: "#1E1A9C",
          900: "#161373",
          950: "#120F5C"
        }
      }
    },
  },
  plugins: [],
}