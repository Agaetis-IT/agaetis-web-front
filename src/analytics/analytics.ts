import reactGA from 'react-ga'

import publicRuntimeConfig from '../config/env.config'

export default function initReactGA() {
  reactGA.initialize(publicRuntimeConfig.NEXT_APP_GOOGLE_ANALYTICS_KEY, {
    debug: true,
  })
}

export function trackUrl() {
  reactGA.pageview(window.location.pathname)
}
