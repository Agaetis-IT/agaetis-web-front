import clsx from 'clsx'
import React, { useState } from 'react'

import arrowL from '../images/left-arrow.svg'
import Nicolas from '../images/Nicolas.png'
import arrowR from '../images/right-arrow.svg'

import Button from './Button'
import './JobsCarousel.css'

interface Props {
  slideMax: number
}

export default function JobsCarousel({ slideMax }: Props) {
  const [slideIndex, setSlideIndex] = useState(0)

  const handleNextSlide = () => {
    if (slideIndex === slideMax) {
      setSlideIndex(0)
    } else {
      setSlideIndex(slideIndex + 1)
    }
  }

  const handlePrevSlide = () => {
    if (slideIndex === 0) {
      setSlideIndex(slideMax)
    } else {
      setSlideIndex(slideIndex - 1)
    }
  }

  return (
    <div className="w-full flex flex-row justify-between">
      <Button onClick={handlePrevSlide} className="text-orange mx-2">
        <img style={{ width: 40, height: 40, color: 'orange' }} src={arrowL} />
      </Button>
      <div>
        <div className={clsx(slideIndex !== 0 ? 'hidden' : 'flex flex-col-reverse sm:flex-row', 'bg-grey m-1 md:m-4 ')}>
          <div className="p-8 pt-4 leading-normal sm:pt-8 sm:pr-4">
            <p className="text-sm italic">
              Dein Syria per speciosam interpatet diffusa planitiem. hanc nobilitat Antiochia, mundo cognita civitas,
              cui non certaverit alia advecticiis ita adfluere copiis et internis, et Laodicia et Apamia itidemque
              Seleucia iam.
            </p>
            <p className="text-blue text-xs font-semibold pt-2">Nicolas Roux</p>
            <p className="text-blue text-xs italic">Co-fondateur Agaetis</p>
          </div>
          <img className="p-8 px-0 pb-4 sm:p-8 sm:pl-4 self-center w-48 h-auto" src={Nicolas} />
        </div>
        <div
          className={clsx(
            slideIndex !== 1 ? 'hidden' : 'flex flex-col-reverse justify-center sm:flex-row',
            'bg-grey m-1 md:m-4'
          )}
        >
          <div className="p-8 pt-4 leading-normal sm:pt-8 sm:pr-4">
            <p className="text-sm italic">
              Dein Syria per speciosam interpatet diffusa planitiem. hanc nobilitat Antiochia, mundo cognita civitas,
              cui non certaverit alia advecticiis ita adfluere copiis et internis, et Laodicia et Apamia itidemque
              Seleucia iam.
            </p>
            <p className="text-blue text-xs font-semibold pt-2">Nicolas Roux</p>
            <p className="text-blue text-xs italic">Co-fondateur Agaetis</p>
          </div>
          <img className="p-8 px-0 pb-4 sm:p-8 sm:pl-4 self-center w-48 h-auto" src={Nicolas} />
        </div>
        <div className={clsx(slideIndex !== 2 ? 'hidden' : 'flex flex-col-reverse sm:flex-row', 'bg-grey m-1 md:m-4')}>
          <div className="p-8 pt-4 leading-normal sm:pt-8 sm:pr-4">
            <p className="text-sm italic">
              Dein Syria per speciosam interpatet diffusa planitiem. hanc nobilitat Antiochia, mundo cognita civitas,
              cui non certaverit alia advecticiis ita adfluere copiis et internis, et Laodicia et Apamia itidemque
              Seleucia iam.
            </p>
            <p className="text-blue text-xs font-semibold pt-2">Nicolas Roux</p>
            <p className="text-blue text-xs italic">Co-fondateur Agaetis</p>
          </div>
          <img className="p-8 px-0 pb-4 sm:p-8 sm:pl-4 self-center w-48 h-auto" src={Nicolas} />
        </div>
        <div className="flex justify-center">
          {Array.from(Array(slideMax + 1), (_, index) => (
            <span
              key={index}
              className={clsx({ 'bg-orange': slideIndex === index }, 'sliderCount border-orange mx-1')}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleNextSlide} className="mx-2">
        <img src={arrowR} style={{ width: 40, height: 40, color: 'orange' }} />
      </Button>
    </div>
  )
}
