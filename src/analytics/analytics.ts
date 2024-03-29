import reactGA from 'react-ga'

export default function initReactGA() {
  reactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY, {
    debug: false,
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
