const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        gray : {
          '50': '#f9fafb',
          ...colors.gray
        },
        blue:{
          '50': '#F7FAFC',
          ...colors.blue
        }
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
}
