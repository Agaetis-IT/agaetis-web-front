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
      whitelist: ['html', 'body', 'figure', 'loading', 'p', 'a', 'button', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
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
