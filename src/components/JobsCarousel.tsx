import clsx from 'clsx'
import React, { useState } from 'react'

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
      <Button onClick={handlePrevSlide}>Prev</Button>
      <div>
        <div className={clsx({ hidden: slideIndex !== 0 }, 'bg-grey m-4')}>
          <p className="text-sm italic p-8">
            Dein Syria per speciosam interpatet diffusa planitiem. hanc nobilitat Antiochia, mundo cognita civitas, cui
            non certaverit alia advecticiis ita adfluere copiis et internis, et Laodicia et Apamia itidemque Seleucia
            iam.
          </p>
        </div>
        <div className={clsx({ hidden: slideIndex !== 1 })}>test1</div>
        <div className={clsx({ hidden: slideIndex !== 2 })}>test2</div>
        <div className="sliderCount border-orange" />
      </div>

      <Button onClick={handleNextSlide}>Next</Button>
    </div>
  )
}
