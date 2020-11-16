import clsx from 'clsx'
import range from 'lodash/range'
import React, { useState } from 'react'

import arrowL from '../public/images/left-arrow.svg'
import arrowR from '../public/images/right-arrow.svg'
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
    <div className="w-full flex flex-row justify-between py-6 md:py-0">
      <Button onClick={handlePrevSlide} className="text-orange mx-2">
        <img style={{ width: 40, height: 40, stroke: 'orange' }} src={arrowL} alt="arrow" />
      </Button>
      <div>
        {slides.map((slide) => (
          <div
            className={clsx(
              slideIndex !== slide.index - 1 ? 'hidden' : 'flex flex-col-reverse sm:flex-row',
              'bg-light-grey m-1 md:m-4 slide'
            )}
            key={slide.index}
          >
            <div className="p-8 pt-4 leading-normal sm:pt-8 sm:pr-4 md:max-w-32">
              <p className="text-sm italic text-justify max-w-sm" dangerouslySetInnerHTML={{ __html: slide.quote }} />
              <p className="text-blue text-xs font-semibold pt-2" dangerouslySetInnerHTML={{ __html: slide.author }} />
              <p className="text-blue text-xs italic" dangerouslySetInnerHTML={{ __html: slide.role }} />
            </div>
            <img className="p-8 px-0 pb-4 sm:p-8 sm:pl-4 self-center w-48 h-auto" src={slide.img} alt={slide.author} />
          </div>
        ))}

        <div className="flex justify-center mt-6">
          {range(slideMax + 1).map((_, index) => (
            <span
              style={{
                width: '8px',
                height: '8px',
                display: 'inline-block',
                border: '1.5px solid #ff7f40',
                borderRadius: '9999px',
              }}
              key={index}
              className={clsx({ 'bg-orange': slideIndex === index }, 'sliderCount border-orange mx-1')}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleNextSlide} className="mx-2">
        <img src={arrowR} style={{ width: 40, height: 40, color: 'orange' }} alt="arrow" />
      </Button>
    </div>
  )
}
