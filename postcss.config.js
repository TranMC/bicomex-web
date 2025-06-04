export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {
      flexbox: 'no-2009',
      grid: 'autoplace',
    },
    'cssnano': {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifySelectors: true,
        mergeLonghand: true,
        mergeRules: true,
        cssDeclarationSorter: true,
        svgo: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }]
    }
  }
}