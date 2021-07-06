import { useEffect, useState } from 'react'
import clsx from 'clsx'

import Button from './Button'

export default function Cookies() {
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
    <div
      className={clsx('bg-gray-800 text-white py-2 px-6 md:px-16 lg:px-32 xl:px-48 flex flex-col md:flex-row justify-center md:justify-between fixed bottom-0 left-0 right-0 z-1000', { hidden: !isOpenedCookies })}
    >
      <p className="text-xs self-center max-w-sm leading-normal text-center md:text-left">
        Ce site utilise des cookies à des fins de mesures d'audience, ainsi que pour améliorer votre expérience de navigation
      </p>
      <div className="flex mt-4 md:m-0 self-center">
        <Button
          onClick={onRefuseAll}
          className="uppercase text-white bg-gray-800 hover:bg-gray-700 py-2 px-6 rounded-full text-xss leading-tight font-semibold self-center shadow-md hover:shadow-lg mr-10 transition-all duration-250"
        >
          Refuser
        </Button>
        <Button
          onClick={onAcceptAll}
          className="uppercase bg-white text-gray-800 py-2 px-6 rounded-full text-xss leading-tight font-semibold self-center shadow-md hover:shadow-lg transition-all duration-250"
        >
          Autoriser
        </Button>
      </div>
    </div>
  )
}
