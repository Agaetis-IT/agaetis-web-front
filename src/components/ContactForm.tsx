import clsx from 'clsx'
import React, { useState } from 'react'

import { sendMessage } from '../Services/wordpressService'

import Step1 from './form/Step1'
import Step2 from './form/Step2'
import Step3 from './form/Step3'
const stepHeaderClassNames =
  'text-xs uppercase text-center py-4 md:inline border border-white font-semibold self-center md:w-1/3 cursor-pointer'

function getHeadersClassNames(index: number, currentIndex: number) {
  if (index === 0) {
    if (currentIndex === 0) {
      return 'text-white w-2/3 bg-blue'
    }
    if (currentIndex === 1) {
      return 'w-1/6 text-blue md:text-dark-grey whitespace-no-wrap overflow-hidden px-4 bg-blue'
    }
    return 'text-dark-grey hidden bg-blue'
  } else if (index === 1) {
    if (currentIndex === 1) {
      return 'text-white w-2/3 bg-blue'
    } else if (currentIndex === 0) {
      return 'w-1/3 text-dark-grey whitespace-no-wrap overflow-hidden px-4 bg-light-grey'
    }
    return 'w-1/3 text-dark-grey whitespace-no-wrap overflow-hidden px-4 bg-blue reverseText'
  } else {
    if (currentIndex === 2) {
      return 'bg-blue text-white w-2/3'
    }
    if (currentIndex === 1) {
      return 'bg-light-grey text-dark-grey w-1/6 whitespace-no-wrap overflow-hidden px-4'
    }
    return 'bg-light-grey text-dark-grey hidden'
  }
}

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
          className={clsx(getHeadersClassNames(0, currentIndex), stepHeaderClassNames)}
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(0)
            }
          }}
        >
          Votre profil
        </div>
        <div
          className={clsx(getHeadersClassNames(1, currentIndex), stepHeaderClassNames)}
          onClick={() => {
            if (currentIndex > 1) {
              setCurrentIndex(1)
            }
          }}
        >
          Vos coordonnées
        </div>
        <div className={clsx(getHeadersClassNames(2, currentIndex), stepHeaderClassNames)}>Votre message</div>
      </div>
      <div className="border border-white md:max-w-md mx-auto md:px-4">
        <div className="bg-light-grey py-8 md:p-12 flex flex-col justify-center">
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
