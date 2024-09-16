const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      fontFamily: {
        text: ["Roboto", ...defaultTheme.fontFamily.serif],
        raleway: ["Raleway", ...defaultTheme.fontFamily.serif],
        poppins: ["Poppins", ...defaultTheme.fontFamily.serif],
      },

      //dont remove, just for test purpose
      colors: {
          'colorBackground': '#2a2c39',
          'colorOrange': '#ef6603',
          'colorText': '#444444',
          'colorTitle': '#2a2c39',
          'colorbluehover': '#4040C7',
          'colorbuttonhover': '#E6E6E6',
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
}
