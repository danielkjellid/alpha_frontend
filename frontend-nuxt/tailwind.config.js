const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './views/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        gray : {
          '50': '#f9fafb',
          ...colors.gray
        },
        blue: {
          '50': '#F7FAFC',
          ...colors.blue
        },
        red: {
          '50': '#fdf2f2',
          ...colors.red
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms')
  ],
}