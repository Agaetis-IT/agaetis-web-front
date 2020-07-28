import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import Button from './Button'
import './Cookies.css'

interface Props {
  className?: string
}

export default function Cookies({ className }: Props) {
  const [isOpenedCookies, setIsOpenedCookies] = useState(true)

  useEffect(() => {
    const cookies = localStorage.getItem('cookies')
    setIsOpenedCookies(!cookies)
  }, [setIsOpenedCookies])

  function onAcceptAll() {
    setIsOpenedCookies(false)
    localStorage.setItem('cookies', JSON.stringify(true))
  }

  function onRefuseAll() {
    setIsOpenedCookies(false)
    localStorage.setItem('cookies', JSON.stringify(false))
  }

  return (
    <div className={clsx('text-white bg-grey text-xss p-4', className, { hidden: !isOpenedCookies })}>
      <div className="flex flex-col md:flex-row justify-around max-w-xl mx-auto">
        <p className="text-xss self-center max-w-sm leading-normal text-center">
          Ce site utilise les cookies, désactiver leur utilisation pourrait avoir une influence négative sur votre
          expérience lors de votre navigation.
        </p>
        <div className="flex flex-col md:flex-row ">
          <Button
            onClick={onRefuseAll}
            className="uppercase text-white self-center border-b md:mr-12 my-4 md:py-0 pb-1 font-semibold"
          >
            Refuser tout
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
