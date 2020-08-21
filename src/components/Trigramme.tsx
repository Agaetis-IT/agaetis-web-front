import React, { useEffect } from 'react'

import './Trigramme.css'
import clsx from 'clsx'
import LineL from '../static/images/line-left.png'
import LineR from '../static/images/line-right.png'

interface Props {
  imageUrl: string
  TrigramOrder: number
  line: string
  lineClassName: string
}

function getTrigramPosition(humanPos: number[], trigramOrder: number) {
  if (trigramOrder === 0) {
    return { top: `${humanPos[0] + 20}px`, left: `${humanPos[1] - 0}px` }
  }
  if (trigramOrder === 1) {
    return { top: `${humanPos[0] + 280}px`, left: `${humanPos[1] - 40}px` }
  }
  if (trigramOrder === 2) {
    return { top: `${humanPos[0] - 50}px`, left: `${humanPos[1] + 220}px` }
  }
  if (trigramOrder === 3) {
    return { top: `${humanPos[0] + 120}px`, left: `${humanPos[1] + 320}px` }
  }
  if (trigramOrder === 4) {
    return { top: `${humanPos[0] + 280}px`, left: `${humanPos[1] + 320}px` }
  }
  return { top: '0', left: '0' }
}

function handleHumanPosition(TrigramOrder: number) {
  return () => {
    const trigramStyle = document.getElementById(`trigram-${TrigramOrder}`).style
    const humanPos = [
      document.getElementById('human').getBoundingClientRect().top - document.body.getBoundingClientRect().top,
      document.getElementById('human').getBoundingClientRect().left,
    ]
    const trigramPosition = getTrigramPosition(humanPos, TrigramOrder)
    trigramStyle.position = 'absolute'

    trigramStyle.top = trigramPosition.top
    trigramStyle.left = trigramPosition.left
  }
}

export default function Trigramme({ imageUrl, TrigramOrder, line, lineClassName }: Props) {
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
      <img src={imageUrl} alt="" />
      <div className="trigram-desc">
        <img src={line === 'L' ? LineL : LineR} className={clsx('line', lineClassName)}></img>
        <p
          className={clsx('absolute block text-xs', `${lineClassName}-text`, line === 'L' ? 'text-left' : 'text-right')}
        >
          Texte explicatif de chaque item
          <br />
          Texte explicatif de chaque item
          <br />
          Texte explicatif de chaque item
        </p>
      </div>
    </div>
  )
}
