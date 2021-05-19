import withCSS from '@zeit/next-css'
import withPurgeCSS from 'next-purgecss'
import withImages from 'next-images'

require('dotenv').config()

const publicRuntimeConfig = Object.keys(process.env).reduce((acc, key) => {
  if (key.startsWith('NEXT_APP_')) {
    return { ...acc, [key]: process.env[key] }
  }
  return acc
}, {})

export default withCSS(
  withPurgeCSS(
    withImages({
      publicRuntimeConfig,
    })
  )
)
