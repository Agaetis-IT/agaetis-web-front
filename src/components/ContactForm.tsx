import clsx from 'clsx'
import React, { useState } from 'react'

import { sendMessage } from '../Services/wordpressService'

import Step1 from './form/Step1'
import Step2 from './form/Step2'
import Step3 from './form/Step3'

export default function ContactTab() {
  const [currentIndex, setCurrentIndex] = useState(0)

  function handleNext() {
    setCurrentIndex(currentIndex + 1)
  }

  async function handleSubmit() {
    const step1 = localStorage.getItem('step1')
    const step2 = localStorage.getItem('step1')
    const step3 = localStorage.getItem('step3')
    if (step1 && step2 && step3) {
      const contactInfos = {
        ...JSON.parse(step1),
        ...JSON.parse(step2),
        ...JSON.parse(step3),
      }
      await sendMessage(
        contactInfos.firstName + ' ' + contactInfos.lastName,
        contactInfos.email,
        contactInfos.message,
        new Date()
      )
      setCurrentIndex(0)
    }
  }

  return (
    <div>
      <div className="flex flex-row md:max-w-md mx-auto md:px-4">
        <div
          className={clsx(
            currentIndex === 0
              ? 'text-white w-2/3'
              : currentIndex === 1
              ? 'w-1/6 text-blue md:text-dark-grey whitespace-no-wrap overflow-hidden px-4'
              : 'text-dark-grey hidden',
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
      <div className="border border-white md:max-w-md mx-auto md:px-4">
        <div className="bg-grey py-8 md:p-12 flex flex-col justify-center">
          <h2 className={clsx({ hidden: currentIndex !== 0 }, 'text-center text-lg md:text-2xl md:mt-0')}>
            Votre demande concerne...
          </h2>
          <h2 className={clsx({ hidden: currentIndex !== 1 }, 'text-center text-lg md:text-2xl md:mt-0')}>
            Saisissez vos coordonnées :
          </h2>
          <h2 className={clsx({ hidden: currentIndex !== 2 }, 'text-center text-lg md:text-2xl md:mt-0')}>
            Saisissez votre message :
          </h2>
          <Step1 className={clsx(currentIndex === 0 ? 'flex flex-col' : 'hidden')} handleNextStep={handleNext} />
          <Step2
            className={clsx(currentIndex === 1 ? 'flex flex-col' : 'hidden', 'px-4 md:px-0')}
            handleNextStep={handleNext}
          />
          <Step3
            className={clsx(currentIndex === 2 ? 'flex flex-col' : 'hidden', 'px-4 md:px-0')}
            handleNextStep={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
