const { colors } = require('tailwindcss/defaultTheme');


module.exports = {
  theme: {
    container: {
      center: true,
    },
    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      default: '5px',
      'lg': '.5rem',
      'full': '9999px'
    },
    fontFamily: {
      sans: ['Open sans', 'sans'],
      display: ['Work Sans', 'sans-serif'],
      body: ['open sans', 'sans-serif'],
    },
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          '100': '#0351C1',
          '200': '#1771F1',
          '300': '#0260E8',
          '400': '#0351C1',

          '500': '#0043A4',
          '600': '#002D6D'
        }
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    }
  },
  variants: {
    fontFamily: ['responsive', 'hover', 'focus']
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue'
    ]
  }
}
