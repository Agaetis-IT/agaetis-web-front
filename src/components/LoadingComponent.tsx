import { useEffect, useState } from 'react'
import { NProgress } from '@tanem/react-nprogress'
import Router from 'next/router'

import LoadingBar from './LoadingBar'
import LoadingContainer from './LoadingContainer'
import LoadingSpinner from './LoadingSpinner'

interface Props {
  color: string
  startPosition: number
  stopDelayMs: number
  height: number
}

export default function LoadingComponent({ color, startPosition, stopDelayMs, height }: Props) {
  let timer = null

  const [animating, setAnimating] = useState(false)
  const [stateKey, setStateKey] = useState(0)

  const routeChangeStart = () => {
    setAnimating(true)
    setStateKey(stateKey ^ 1)
  }

  const routeChangeEnd = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setAnimating(false)
    }, stopDelayMs)
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', routeChangeStart)
    Router.events.on('routeChangeComplete', routeChangeEnd)
    Router.events.on('routeChangeError', routeChangeEnd)

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart)
      Router.events.off('routeChangeComplete', routeChangeEnd)
      Router.events.off('routeChangeError', routeChangeEnd)
    }
  }, [routeChangeStart, routeChangeEnd])

  return (
    <div className="absolute">
      <NProgress isAnimating={animating} minimum={startPosition} key={stateKey}>
        {({ animationDuration, isFinished, progress }) => (
          <LoadingContainer animationDuration={animationDuration} isFinished={isFinished}>
            <LoadingBar animationDuration={animationDuration} progress={progress} color={color} height={height} />
            <div className="fixed block z-spinner top-4 right-4">
              <LoadingSpinner color={color} size={18} />
            </div>
          </LoadingContainer>
        )}
      </NProgress>
    </div>
  )
}
