/* eslint-disable @typescript-eslint/no-var-requires */
const purgecss = require('@fullhuman/postcss-purgecss')

const tailwind = require('tailwindcss')
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

module.exports = {
  plugins: [
    tailwind('./tailwind.config.js'),
    purgecss({
      content: ['./src/**/*.tsx'],
      whitelist: ['html', 'body', 'figure', 'loading'],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html', 'tsx'],
        },
      ],
    }),
    require('autoprefixer'),
  ],
}
