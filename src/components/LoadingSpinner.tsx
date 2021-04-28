import React from 'react'

import './LoadingSpinner.css'

interface Props {
  color: string
  size: number
}

export default function LoadingSpinner({ color, size }: Props) {
  return (
    <div className="spinner" role="spinner">
      <div
        className="spinner-icon border-2 rounded-full container border-transparent"
        style={{ borderTopColor: color, borderLeftColor: color, width: size, height: size }}
      />
    </div>
  )
}
