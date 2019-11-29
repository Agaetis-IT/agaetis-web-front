import reactGA from 'react-ga'

import publicRuntimeConfig from '../config/env.config'

export default function initReactGA() {
  reactGA.initialize(publicRuntimeConfig.NEXT_APP_GOOGLE_ANALYTICS_KEY, {
    debug: true,
  })
}

export function newReactGAEvent(category: string, action: string, label?: string, value?: number) {
  reactGA.event({
    category,
    action,
    label,
    value,
  })
}

export function trackUrl() {
  reactGA.pageview(window.location.pathname)
}

export function newReactGACustomVar(dimensionId: number, value: string) {
  reactGA.ga('set', 'dimension' + dimensionId, value)
}
