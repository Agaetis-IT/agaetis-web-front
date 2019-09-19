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
      <Button onClick={handlePrevSlide}>
        <img style={{ width: 40, height: 40, color: 'orange' }} className="text-orange" src={arrowL} />
      </Button>
      <div>
        <div className={clsx(slideIndex !== 0 ? 'hidden' : 'flex flex-row', 'bg-grey m-4')}>
          <div className="p-8 leading-normal pr-4">
            <p className="text-sm italic">
              Dein Syria per speciosam interpatet diffusa planitiem. hanc nobilitat Antiochia, mundo cognita civitas,
              cui non certaverit alia advecticiis ita adfluere copiis et internis, et Laodicia et Apamia itidemque
              Seleucia iam.
            </p>
            <p className="text-blue text-xs font-semibold pt-2">Nicolas Roux</p>
            <p className="text-blue text-xs italic">Co-fondateur Agaetis</p>
          </div>
          <img className="p-8 pl-4" src={Nicolas} />
        </div>
        <div className={clsx(slideIndex !== 1 ? 'hidden' : 'flex flex-row', 'bg-grey m-4')}>
          <div className="p-8 leading-normal pr-4">
            <p className="text-sm italic">
              Dein Syria per speciosam interpatet diffusa planitiem. hanc nobilitat Antiochia, mundo cognita civitas,
              cui non certaverit alia advecticiis ita adfluere copiis et internis, et Laodicia et Apamia itidemque
              Seleucia iam.
            </p>
            <p className="text-blue text-xs font-semibold pt-2">Nicolas Roux</p>
            <p className="text-blue text-xs italic">Co-fondateur Agaetis</p>
          </div>
          <img className="p-8 pl-4" src={Nicolas} />
        </div>
        <div className={clsx(slideIndex !== 2 ? 'hidden' : 'flex flex-row', 'bg-grey m-4')}>
          <div className="p-8 leading-normal pr-4">
            <p className="text-sm italic">
              Dein Syria per speciosam interpatet diffusa planitiem. hanc nobilitat Antiochia, mundo cognita civitas,
              cui non certaverit alia advecticiis ita adfluere copiis et internis, et Laodicia et Apamia itidemque
              Seleucia iam.
            </p>
            <p className="text-blue text-xs font-semibold pt-2">Nicolas Roux</p>
            <p className="text-blue text-xs italic">Co-fondateur Agaetis</p>
          </div>
          <img className="p-8 pl-4" src={Nicolas} />
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

      <Button onClick={handleNextSlide}>
        <img src={arrowR} style={{ width: 40, height: 40, color: 'orange' }} />
      </Button>
    </div>
  )
}
