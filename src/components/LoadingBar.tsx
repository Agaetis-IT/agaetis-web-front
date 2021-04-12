import React from 'react'

import './LoadingBar.css'

interface Props {
  animationDuration: number
  progress: number
  color: string
  height: number
}

export default function LoadingBar({ animationDuration, progress, color, height }: Props) {
  return (
    <div
      className="bar fixed"
      role="bar"
      style={{
        background: color,
        height: height,
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    >
      <div
        className="light-effect block absolute"
        style={{
          boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
          transform: 'rotate(3deg) translate(0px, -4px)',
        }}
      ></div>
    </div>
  )
}
