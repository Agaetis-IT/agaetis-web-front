const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const withPurgeCSS = require('next-purgecss')
const withImages = require('next-images')
const yupConfig = require('./src/config/yupConfig')

require('dotenv').config()

const publicRuntimeConfig = Object.keys(process.env).reduce((acc, key) => {
  if (key.startsWith('NEXT_APP_')) {
    return { ...acc, [key]: process.env[key] }
  }
  return acc
}, {})

module.exports = withCSS(
  withTypescript(
    withPurgeCSS(
      withImages({
        publicRuntimeConfig,
        yupConfig,
      })
    )
  )
)
