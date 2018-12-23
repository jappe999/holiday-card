const Dotenv = require('dotenv-webpack')
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')

const config = {
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss('./tailwind.js'),
        ]
      }
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  config.css.loaderOptions.postcss.plugins.push(
    purgecss({
      content: ['./src/**/*.vue'],
      extractors: [{
        extractor: class TailwindExtractor {
          static extract(content) {
            return content.match(/[A-z0-9-:/]+/g) || [];
          }
        },
        extensions: ['vue']
      }]
    })
  )
}

module.exports = config