import clsx from 'clsx'
import React from 'react'

import Cross from '../static/images/cross-icon-png-1.png'
import Tick from '../static/images/Flat_tick_icon.svg.png'

import './ContactMessage.css'

interface Props {
  error: boolean
}

export default function ContactMessage({ error }: Props) {
  return (
    <div className={clsx('flex flex-row bg-white p-8 mx-auto rounded-lg contact-modal')}>
      <h3 className="self-center block mr-4 text-grey">
        {error ? "Erreur lors de l'envoi, vérifiez les informations fournies" : 'Message Envoyé'}
      </h3>
      {!error && <img src={Tick} alt="tick" className="w-12 h-12 block" />}
      {error && <img src={Cross} alt="cross" className="w-12 h-12 block" />}
    </div>
  )
}
