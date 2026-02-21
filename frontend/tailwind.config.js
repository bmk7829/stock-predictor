/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        panel: "rgb(15 23 42)",   // slate-900-ish
        panel2: "rgb(2 6 23)"     // slate-950-ish
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};