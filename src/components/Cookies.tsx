import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import Button from './Button'
import './Cookies.css'

interface Props {
  className?: string
}

export default function Cookies({ className }: Props) {
  const [, setIsOpenedCookies] = useState(undefined)
  useEffect(() => {
    setIsOpenedCookies(!localStorage.getItem('cookies'))
  })

  function onAcceptAll() {
    setIsOpenedCookies(false)
    localStorage.setItem('cookies', 'true')
  }

  return (
    <div className={clsx('text-white bg-grey text-xss p-4', className)}>
      <div className="flex flex-col md:flex-row justify-around max-w-xl mx-auto">
        <p className="text-xss self-center max-w-sm leading-normal text-center">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rel
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        </p>
        <div className="flex flex-col md:flex-row ">
          <Button
            href="/cookies"
            className="uppercase text-white self-center border-b md:mr-12 my-4 md:py-0 pb-1 font-semibold"
          >
            Option de cookies
          </Button>
          <Button
            onClick={onAcceptAll}
            className="uppercase text-white bg-grey-darker px-4 py-2 rounded-full text-xss font-semibold"
          >
            Autoriser tout
          </Button>
        </div>
      </div>
    </div>
  )
}
