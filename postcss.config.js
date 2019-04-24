const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    purgecss({
      content: ['./src/**/*.tsx'],
      whitelist: ['html', 'body'],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html', 'tsx'],
        },
      ],
    }),
    autoprefixer,
  ],
}
