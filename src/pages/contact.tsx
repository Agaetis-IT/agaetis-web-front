import clsx from 'clsx'
import React, { useState } from 'react'

import Button from '../components/Button'
import Layout from '../components/Layout'

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
          <div className="text-xs uppercase text-center text-white w-1/3 py-4 bg-blue border border-white font-semibold">
            1. Votre profil
          </div>
          <div
            className={clsx(
              currentIndex > 0 ? 'bg-blue text-white' : 'bg-grey text-dark-grey',
              'text-xs uppercase text-center w-1/3 py-4 border border-white font-semibold'
            )}
          >
            2. Vos coordonnées
          </div>
          <div
            className={clsx(
              currentIndex > 1 ? 'bg-blue text-white' : 'bg-grey text-dark-grey',
              'text-xs uppercase text-center w-1/3 py-4 border border-white font-semibold'
            )}
          >
            {' '}
            3. Votre message
          </div>
        </div>
        <div className="border border-white md:max-w-md mx-auto px-4">
          <div className={clsx({ hidden: currentIndex !== 0 }, 'bg-grey')}>
            <Button
              className="px-6 py-2 leading-none rounded-full uppercase mt-4 mb-6 md:mb-0 bg-orange text-white text-xs font-semibold inline-block"
              onClick={handleNext}
            >
              Poursuivre
            </Button>
          </div>
          <div className={clsx({ hidden: currentIndex !== 1 }, 'bg-grey')}>
            <Button
              className="px-6 py-2 leading-none rounded-full uppercase mt-4 mb-6 md:mb-0 bg-orange text-white text-xs font-semibold inline-block"
              onClick={handleNext}
            >
              Poursuivre
            </Button>
          </div>
          <div className={clsx({ hidden: currentIndex !== 2 }, 'bg-grey')}>
            <Button
              className="px-6 py-2 leading-none rounded-full uppercase mt-4 mb-6 md:mb-0 bg-orange text-white text-xs font-semibold inline-block"
              onClick={handleNext}
            >
              Poursuivre
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
