import clsx from 'clsx'
import Image from 'next/image'
import { useEffect } from 'react'

const Cross = '/images/cross-icon-png-1.png'
const Tick = '/images/Flat_tick_icon.svg.png'

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
        <Image src={Cross} alt="cross" className="w-8 h-8" width={500} height={500} layout="fixed" quality={100}/>
      ) : (
        <Image src={Tick} alt="tick" className="w-8 h-8" width={768} height={768} layout="fixed" quality={100}/>
      )}
      <h4 className="self-center block ml-4 text-black">{message}</h4>
    </div>
  )
}
