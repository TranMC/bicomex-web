export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {
      flexbox: 'no-2009',
    },
    'cssnano': {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifySelectors: true
      }]
    }
  }
}