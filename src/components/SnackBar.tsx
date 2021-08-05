import { useEffect } from 'react'

const Cross = '/images/cross-icon-png-1.png'
const Tick = '/images/Flat_tick_icon.svg.png'

interface Props {
  message: string
  isError?: boolean
  timeoutDuration?: number
  open?: boolean
  onClose?: () => void
}

export default function SnackBar({ message, isError, timeoutDuration = 7000, open, onClose }: Props) {
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
    <div className="flex flex-row bg-white p-4 rounded-lg shadow-md fixed top-24 right-3 ml-3 z-spinner">
      <img className="w-8 h-8" src={isError ? Cross : Tick} title={isError ? 'Erreur' : 'Succès'} alt={isError ? 'Erreur' : 'Succès'} width={32} height={32} loading="eager" />
      <h4 className="self-center block ml-4 text-black">{message}</h4>
    </div>
  )
}
