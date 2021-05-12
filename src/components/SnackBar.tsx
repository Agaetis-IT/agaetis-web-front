import clsx from 'clsx'
import React, { useEffect } from 'react'

import Cross from '../static/images/cross-icon-png-1.png'
import Tick from '../static/images/Flat_tick_icon.svg.png'

import './SnackBar.css'

interface Props {
  message: string
  isError?: boolean
  timeoutDuration?: number
  open?: boolean
  onClose?: () => void
}

export default function SnackBar({ message, isError, timeoutDuration = 3000, open, onClose }: Props) {
  useEffect(() => {
    if (open !== undefined) {
      setTimeout(() => {
        if (onClose !== undefined) {
          onClose()
        }
      }, timeoutDuration)
    }
  }, [open])

  if (open === undefined) {
    return null
  }

  return (
    <div className={clsx('flex flex-row bg-white p-4 rounded-lg shadow-md snack-bar-modal')}>
      {isError ? (
        <img src={Cross} alt="cross" className="w-8 h-8 block" />
      ) : (
        <img src={Tick} alt="tick" className="w-8 h-8 block" />
      )}
      <h4 className="self-center block ml-4 text-black">{message}</h4>
    </div>
  )
}
