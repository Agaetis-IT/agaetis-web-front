import clsx from 'clsx'
import React, { useState } from 'react'

import Button from '../components/Button'
import Layout from '../components/Layout'

import './contact.css'

export default function contact() {
  const [currentIndex, setCurrentIndex] = useState(0)
  function handleNext() {
    setCurrentIndex(currentIndex + 1)
  }
  return (
    <Layout headerProps={{ invertColors: false }}>
      <div>
        <h1 className="text-center">Contact</h1>
        <p className="md:max-w-md mx-auto text-center p-6 text-xs leading-normal">
          At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
          atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
          sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga
        </p>
        <div className="flex flex-row md:max-w-md mx-auto px-4">
          <div
            className={clsx(
              currentIndex === 0
                ? 'text-white w-2/3'
                : currentIndex === 2
                ? 'text-dark-grey hidden'
                : 'w-1/6 text-blue md:text-dark-grey whitespace-no-wrap overflow-hidden px-4',
              'text-xs uppercase text-center md:w-1/3 py-4 md:inline bg-blue border border-white font-semibold self-center'
            )}
          >
            Votre profil
          </div>
          <div
            className={clsx(
              currentIndex > 0 ? 'bg-blue' : 'bg-grey',
              currentIndex === 1
                ? 'text-white w-2/3'
                : currentIndex === 2
                ? 'w-1/3 text-dark-grey whitespace-no-wrap overflow-hidden px-4 reverseText'
                : 'w-1/3 text-dark-grey whitespace-no-wrap overflow-hidden px-4',
              'text-xs uppercase text-center md:w-1/3 py-4 border border-white font-semibold self-center'
            )}
          >
            Vos coordonnées
          </div>
          <div
            className={clsx(
              currentIndex === 2
                ? 'bg-blue text-white w-2/3'
                : currentIndex === 1
                ? 'bg-grey text-dark-grey w-1/6 whitespace-no-wrap overflow-hidden px-4'
                : 'bg-grey text-dark-grey hidden',
              'text-xs uppercase text-center md:w-1/3 md:inline py-4 border border-white font-semibold self-center'
            )}
          >
            Votre message
          </div>
        </div>
        <div className="border border-white md:max-w-md mx-auto px-4">
          <div className="bg-grey md:p-12 flex flex-col justify-center">
            <h2 className={clsx({ hidden: currentIndex !== 0 }, 'text-center text-lg md:text-2xl mt-8 md:mt-0')}>
              Votre demande concerne...
            </h2>
            <h2 className={clsx({ hidden: currentIndex !== 1 }, 'text-center text-lg md:text-2xl mt-8 md:mt-0')}>
              Saisissez vos coordonnées :
            </h2>
            <h2 className={clsx({ hidden: currentIndex !== 2 }, 'text-center text-lg md:text-2xl mt-8 md:mt-0')}>
              Saisissez votre message :
            </h2>
            <form className="mt-4">
              <div className="flex flex-col md:flex-row justify-center">
                <div className={clsx({ hidden: currentIndex !== 0 }, 'my-2 md:m-0')}>
                  <input type="radio" name="radio" id="radio1" className="hidden" />
                  <Button
                    className="border-2 border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                    htmlFor="radio1"
                  >
                    Un projet ?
                  </Button>
                </div>
                <div className={clsx({ hidden: currentIndex !== 0 }, 'my-2 md:m-0')}>
                  <input type="radio" name="radio" id="radio2" className="hidden" />
                  <Button
                    className="border-2 border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                    htmlFor="radio2"
                  >
                    Une candidature ?
                  </Button>
                </div>
                <div className={clsx({ hidden: currentIndex !== 0 }, 'my-2 md:m-0')}>
                  <input type="radio" name="radio" id="radio3" className="hidden" />
                  <Button
                    className="border-2 border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                    htmlFor="radio3"
                  >
                    Un café ?
                  </Button>
                </div>
              </div>
              <div className={clsx({ hidden: currentIndex !== 1 }, 'block w-full justify-center')}>
                <div className="p-2">
                  <label className="block text-xss font-bold mb-2" htmlFor="firstname">
                    Prénom
                  </label>
                  <input
                    className="shadow appearance-none rounded-sm text-xs w-full py-2 px-3 text-dark-grey leading-tight"
                    id="firstname"
                    type="text"
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="p-2">
                  <label className="block text-xss font-bold mb-2" htmlFor="lastname">
                    Nom
                  </label>
                  <input
                    className="shadow appearance-none rounded-sm text-xs w-full py-2 px-3 text-dark-grey leading-tight"
                    id="lastname"
                    type="text"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="p-2">
                  <label className="block text-xss font-bold mb-2" htmlFor="mail">
                    E-mail
                  </label>
                  <input
                    className="shadow appearance-none rounded-sm text-xs w-full py-2 px-3 text-dark-grey leading-tight"
                    id="mail"
                    type="mail"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="p-2">
                  <label className="block text-xss font-bold mb-2" htmlFor="tel">
                    Téléphone
                  </label>
                  <input
                    className="shadow appearance-none rounded-sm text-xs w-full py-2 px-3 text-dark-grey leading-tight"
                    id="tel"
                    type="text"
                    placeholder="Votre téléphone"
                  />
                </div>
                <div className="p-2">
                  <label className="block text-xss font-bold mb-2" htmlFor="company">
                    Société
                  </label>
                  <input
                    className="shadow appearance-none rounded-sm text-xs w-full py-2 px-3 text-dark-grey leading-tight"
                    id="company"
                    type="text"
                    placeholder="Votre société"
                  />
                </div>
                <div className="p-2 flex flex-row align-middle">
                  <input className="opacity-75" id="cgu" type="checkbox" />
                  <label className="block text-cgu ml-1" htmlFor="cgu">
                    En soumettant ce formulaire et conformément à la politique de traitement des données personnelles,
                    j'accepte que les informations saisies soient exploitées afin d'être contacté par les équipes
                    d'agaetis.
                  </label>
                </div>
              </div>
              <div className={clsx({ hidden: currentIndex !== 2 }, 'p-2')}>
                <label className="block text-xss font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="shadow appearance-none rounded-sm text-xs w-full h-32 overflow-y-scroll py-2 px-3 text-dark-grey leading-tight"
                  id="message"
                  defaultValue="Votre message"
                />
              </div>
            </form>
            <Button
              href="#"
              className={clsx(
                { hidden: currentIndex === 2 },
                'w-32 py-2 leading-none rounded-full uppercase mx-auto text-center mt-4 mb-6 md:mb-0 bg-orange text-white text-xs font-semibold inline-block'
              )}
              onClick={handleNext}
            >
              Poursuivre
            </Button>
            <Button
              href="/contact"
              className={clsx(
                { hidden: currentIndex !== 2 },
                'w-32 py-2 leading-none rounded-full uppercase mx-auto mt-4 mb-6 md:mb-0 bg-orange text-white text-xs text-center font-semibold inline-block'
              )}
            >
              Valider
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
