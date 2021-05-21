/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images')

require('dotenv').config()

const publicRuntimeConfig = Object.keys(process.env).reduce((acc, key) => {
  if (key.startsWith('NEXT_APP_')) {
    return { ...acc, [key]: process.env[key] }
  }
  return acc
}, {})

module.exports = withImages({ publicRuntimeConfig })
