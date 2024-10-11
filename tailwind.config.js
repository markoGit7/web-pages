const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html","blog.html","blog-single.html","service-details.html"],
  theme: {
    extend: {
      fontFamily: {
        text: ["Roboto", ...defaultTheme.fontFamily.serif],
        raleway: ["Raleway", ...defaultTheme.fontFamily.serif],
        poppins: ["Poppins", ...defaultTheme.fontFamily.serif],
      },

      backgroundImage: {
        'arrow-down': "url('/images/chevron-down.svg')",
      },

      transitionProperty: {
        'display': 'display',
      },

      //dont remove, just for test purpose
      colors: {
          'colorBackground': '#2a2c39',
          'colorOrange': '#ef6603',
          'colorText': '#444444',
          'colorTitle': '#2a2c39',
          'colorbluehover': '#4040C7',
          'colorbuttonhover': '#E6E6E6',
          'colorDropDown': '#060606',
          'colorError': '#df1529',
          'colorSuccess': '#059652',
          'starsColor': '#ffc107',
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
}
