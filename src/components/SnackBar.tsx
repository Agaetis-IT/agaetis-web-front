import clsx from 'clsx'
import Image from 'next/image'
import { useEffect } from 'react'

import Cross from '../../public/images/cross-icon-png-1.png'
import Tick from '../../public/images/Flat_tick_icon.svg.png'

import styles from '../styles/SnackBar.module.css'

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
  }, [open, onClose, timeoutDuration])

  if (open === undefined) {
    return null
  }

  return (
    <div className={clsx('flex flex-row bg-white p-4 rounded-lg shadow-md fixed', styles.snackBarModal)}>
      {isError ? (
        <div className="w-8 h-8">
          <Image src={Cross} alt="cross" quality={100}/>
        </div>
      ) : (
        <div className="w-8 h-8">
          <Image src={Tick} alt="tick" quality={100}/>
        </div>
      )}
      <h4 className="self-center block ml-4 text-black">{message}</h4>
    </div>
  )
}
