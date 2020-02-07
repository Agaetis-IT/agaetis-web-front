import Router from 'next/router'
import React from 'react'

import Button from '../components/Button'
import CookiesAcceptService from '../components/CookiesAcceptService'
import Cross from '../images/cross.svg'

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
            buttons={[{ text: 'Accepter Tout' }, { text: 'Refuser Tout' }]}
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
              buttons={[{ text: 'Accepter' }, { text: 'Refuser' }]}
              className="py-4"
            />
            <CookiesAcceptService
              serviceName="Service A2"
              buttons={[{ text: 'Accepter' }, { text: 'Refuser' }]}
              className="py-4"
            />
            <CookiesAcceptService
              serviceName="Service A3"
              buttons={[{ text: 'Accepter' }, { text: 'Refuser' }]}
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
              buttons={[{ text: 'Accepter' }, { text: 'Refuser' }]}
              className="py-4"
            />
            <CookiesAcceptService
              serviceName="Service B2"
              buttons={[{ text: 'Accepter' }, { text: 'Refuser' }]}
              className="py-4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
