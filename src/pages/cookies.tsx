import Router from 'next/router'
import React from 'react'

import Button from '../components/Button'
import CookiesAcceptService from '../components/CookiesAcceptService'
import Cross from '../images/cross.svg'

function setCookieStatus(serviceName: string, status: boolean) {
  return () => {
    if (!localStorage.getItem('cookies')) {
      localStorage.setItem('cookies', '{}')
    }
    const cookiesObject = JSON.parse(localStorage.getItem('cookies')!)
    cookiesObject[serviceName] = status
    localStorage.setItem('cookies', JSON.stringify(cookiesObject))
  }
}

export default function cookies() {
  return (
    <div className="text-white bg-grey text-xss sm:p-4 ">
      <div className="flex flex-col max-w-lg mx-auto">
        <Button className="m-4 text-right" onClick={() => Router.back()}>
          <img src={Cross} className="text-light-grey crossButton" style={{}} />
        </Button>
        <div className="flex flex-col p-4 sm:p-12 max-w-md mx-auto ">
          <h2 className="uppercase text-center text-2xl">Gestion de vos préférences sur les cookies</h2>
          <p className="py-8 leading-normal text-center">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
            ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae
          </p>
          <CookiesAcceptService
            serviceName="Préférences pour tous les services"
            buttons={[
              { text: 'Accepter Tout', callback: setCookieStatus('All', true) },
              { text: 'Refuser Tout', callback: setCookieStatus('All', false) },
            ]}
          />
          <hr className="my-8 white-separator" />
          <div>
            <h3>Catégorie de service A</h3>
            <p className="py-4">
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas, assumenda est, omnis dolor repellendus.
            </p>
            <CookiesAcceptService
              serviceName="Service A1"
              buttons={[
                { text: 'Accepter', callback: setCookieStatus('A1', true) },
                { text: 'Refuser', callback: setCookieStatus('A1', false) },
              ]}
              className="py-4"
            />
            <CookiesAcceptService
              serviceName="Service A2"
              buttons={[
                { text: 'Accepter', callback: setCookieStatus('A2', true) },
                { text: 'Refuser', callback: setCookieStatus('A2', false) },
              ]}
              className="py-4"
            />
            <CookiesAcceptService
              serviceName="Service A3"
              buttons={[
                { text: 'Accepter', callback: setCookieStatus('A3', true) },
                { text: 'Refuser', callback: setCookieStatus('A3', false) },
              ]}
              className="py-4"
            />
          </div>
          <hr className="my-8 white-separator" />
          <div>
            <h3>Catégorie de service B</h3>
            <p className="py-4">
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas, assumenda est, omnis dolor repellendus.
            </p>
            <CookiesAcceptService
              serviceName="Service B1"
              buttons={[
                { text: 'Accepter', callback: setCookieStatus('B1', true) },
                { text: 'Refuser', callback: setCookieStatus('B1', false) },
              ]}
              className="py-4"
            />
            <CookiesAcceptService
              serviceName="Service B2"
              buttons={[
                { text: 'Accepter', callback: setCookieStatus('B2', true) },
                { text: 'Refuser', callback: setCookieStatus('B2', false) },
              ]}
              className="py-4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
