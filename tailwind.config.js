const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.serif],
      },

      //dont remove, just for test purpose
      colors: {
          'colormain': '#1E1E1E',
          'colorblue': '#5152FB',
          'colorbluedark': '#012169',
          'colorbluelight': '#EBF3FF',
          'colorbluehover': '#4040C7',
          'colorbuttonhover': '#E6E6E6',
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
}
