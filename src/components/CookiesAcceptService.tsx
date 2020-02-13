import clsx from 'clsx'
import React from 'react'

import Button from './Button'

interface Props {
  serviceName: string
  className?: string
  buttons: ActionButton[]
}

interface ActionButton {
  text: string
  callback?(e: React.MouseEvent): void
}

export default function CookiesAcceptService({ buttons, serviceName, className }: Props) {
  return (
    <div className={clsx('flex flex-row justify-between', className)}>
      <h3 className="self-center">{serviceName}</h3>
      <div className="flex flex-col sm:flex-row">
        <Button
          onClick={buttons[0].callback}
          className="w-32 uppercase text-white bg-orange px-4 py-2 rounded-full text-xss font-semibold mr-4 my-1 sm:my-0"
        >
          {buttons[0].text}
        </Button>
        <Button
          onClick={buttons[1].callback}
          className="w-32 uppercase text-white bg-grey-darker px-4 py-2 rounded-full text-xss font-semibold my-1 sm:my-0"
        >
          {buttons[1].text}
        </Button>
      </div>
    </div>
  )
}
