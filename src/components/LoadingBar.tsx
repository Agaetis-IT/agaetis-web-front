import React from 'react'

interface Props {
  animationDuration: number
  progress: number
  color: string
  height: number
}

export default function LoadingBar({ animationDuration, progress, color, height }: Props) {
  return (
    <div
      className="fixed"
      role="bar"
      style={{
        background: color,
        height: height,
        left: 0,
        marginLeft: `${(-1 + progress) * 100}%`,
        top: 0,
        width: '100%',
        transition: `margin-left ${animationDuration}ms linear`,
        zIndex: 1031,
      }}
    >
      <div
        className="block absolute"
        style={{
          boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
          height: '100%',
          opacity: 1,
          right: 0,
          transform: 'rotate(3deg) translate(0px, -4px)',
          width: 100,
        }}
      ></div>
    </div>
  )
}
