import clsx from 'clsx'
import React, { useState } from 'react'

import arrowL from '../images/left-arrow.svg'
import arrowR from '../images/right-arrow.svg'
import { Slide } from '../types/JobsContent'

import Button from './Button'
import './JobsCarousel.css'

interface Props {
  slideMax: number
  slides: Slide[]
}

export default function JobsCarousel({ slideMax, slides }: Props) {
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
        {slides.map(slide => (
          <div
            className={clsx(
              slideIndex !== slide.index - 1 ? 'hidden' : 'flex flex-col-reverse sm:flex-row',
              'bg-grey m-1 md:m-4 '
            )}
            key={slide.index}
          >
            <div className="p-8 pt-4 leading-normal sm:pt-8 sm:pr-4">
              <p className="text-sm italic" dangerouslySetInnerHTML={{ __html: slide.quote }} />
              <p className="text-blue text-xs font-semibold pt-2" dangerouslySetInnerHTML={{ __html: slide.author }} />
              <p className="text-blue text-xs italic" dangerouslySetInnerHTML={{ __html: slide.role }} />
            </div>
            <img className="p-8 px-0 pb-4 sm:p-8 sm:pl-4 self-center w-48 h-auto" src={slide.img} />
          </div>
        ))}

        <div className="flex justify-center mt-6">
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
