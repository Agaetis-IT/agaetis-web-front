import React, { useEffect } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import './Trigramme.css'
import clsx from 'clsx'
import LineL from '../static/images/line-left.png'
import LineR from '../static/images/line-right.png'

interface Props {
  imageUrl: string
  TrigramOrder: number
  line: string
  lineClassName: string
  items: string
}

function getTrigramPosition(humanPos: number[], trigramOrder: number) {
  if (window && window.innerWidth < 1200) {
    if (trigramOrder === 0) {
      return { top: `${humanPos[0] + 20}px`, left: `${humanPos[1] - 80}px` }
    }
    if (trigramOrder === 1) {
      return { top: `${humanPos[0] + 280}px`, left: `${humanPos[1] - 120}px` }
    }
    if (trigramOrder === 2) {
      return { top: `${humanPos[0] - 50}px`, left: `${humanPos[1] + 180}px` }
    }
    if (trigramOrder === 3) {
      return { top: `${humanPos[0] + 120}px`, left: `${humanPos[1] + 280}px` }
    }
    if (trigramOrder === 4) {
      return { top: `${humanPos[0] + 280}px`, left: `${humanPos[1] + 280}px` }
    }
    return { top: '0', left: '0' }
  } else {
    if (trigramOrder === 0) {
      return { top: `${humanPos[0] + 20}px`, left: `${humanPos[1] - 120}px` }
    }
    if (trigramOrder === 1) {
      return { top: `${humanPos[0] + 280}px`, left: `${humanPos[1] - 160}px` }
    }
    if (trigramOrder === 2) {
      return { top: `${humanPos[0] - 50}px`, left: `${humanPos[1] + 100}px` }
    }
    if (trigramOrder === 3) {
      return { top: `${humanPos[0] + 120}px`, left: `${humanPos[1] + 200}px` }
    }
    if (trigramOrder === 4) {
      return { top: `${humanPos[0] + 280}px`, left: `${humanPos[1] + 200}px` }
    }
    return { top: '0', left: '0' }
  }
}

function handleHumanPosition(TrigramOrder: number) {
  return () => {
    if (
      document.getElementById(`trigram-${TrigramOrder}`) &&
      document.getElementById('human') &&
      document.getElementById('expertise-container-desktop')
    ) {
      const trigramStyle = document.getElementById(`trigram-${TrigramOrder}`)!.style
      const humanPos = [
        document.getElementById('human')!.getBoundingClientRect().top -
          document.getElementById('expertise-container-desktop')!.getBoundingClientRect().top,
        document.getElementById('human')!.getBoundingClientRect().left,
      ]
      // eslint-disable-next-line
      // @ts-ignore
      if (document.querySelector('#human').complete) {
        const trigramPosition = getTrigramPosition(humanPos, TrigramOrder)
        trigramStyle.position = 'absolute'

        trigramStyle.top = trigramPosition.top
        trigramStyle.left = trigramPosition.left
      } else {
        document.querySelector('#human')!.addEventListener('load', () => {
          const trigramPosition = getTrigramPosition(humanPos, TrigramOrder)
          trigramStyle.position = 'absolute'

          trigramStyle.top = trigramPosition.top
          trigramStyle.left = trigramPosition.left
        })
      }
    }
  }
}

export default function Trigramme({ imageUrl, TrigramOrder, line, lineClassName, items }: Props) {
  useEffect(() => {
    if (window && document) {
      handleHumanPosition(TrigramOrder)()

      window.addEventListener('resize', handleHumanPosition(TrigramOrder))
    }
    return () => {
      window.removeEventListener('resize', handleHumanPosition(TrigramOrder))
    }
  }, [TrigramOrder])
  return (
    <div
      className={clsx('flex', line === 'R' ? 'flex-row' : 'flex-row-reverse', 'trigram')}
      id={`trigram-${TrigramOrder}`}
    >
      {
        // eslint-disable-next-line
        // @ts-ignore-next-line
        <LazyLoadImage effect="blur" src={imageUrl} alt="trigramme"></LazyLoadImage>
      }
      <div className="trigram-desc">
        {
          // eslint-disable-next-line
          // @ts-ignore-next-line
          <LazyLoadImage
            effect="blur"
            src={line === 'L' ? LineL : LineR}
            className={clsx('line', lineClassName)}
            alt="line"
          ></LazyLoadImage>
        }
        <p
          className={clsx(
            'absolute block text-xs leading-normal',
            `${lineClassName}-text`,
            line === 'L' ? 'text-left' : 'text-right'
          )}
          dangerouslySetInnerHTML={{ __html: items.split(',').join('<br/>') }}
        ></p>
      </div>
    </div>
  )
}
