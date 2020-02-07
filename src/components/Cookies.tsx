import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import Button from './Button'

interface Props {
  className?: string
}

export default function Cookies({ className }: Props) {
  const [isOpenedCookies, setIsOpenedCookies] = useState(undefined)
  useEffect(() => {
    setIsOpenedCookies(!localStorage.getItem('cookies'))
  })

  function onAcceptAll() {
    setIsOpenedCookies(false)
    localStorage.setItem('cookies', 'true')
  }

  return (
    <div className={clsx('text-white bg-grey p-4 text-xss ', isOpenedCookies ? className : 'none')}>
      <div className="flex flex-row justify-around max-w-xl mx-auto">
        <p className="text-xss self-center max-w-sm leading-normal">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rel
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        </p>
        <div className="flex flex-row ">
          <Button href="/cookies" className="uppercase text-white self-center border-b mr-12 pb-1 font-semibold">
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
