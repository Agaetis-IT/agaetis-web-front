import React from 'react'

import clsx from 'clsx'
import { Conviction } from '../types/IndexContent'

interface Props {
  title: string
  convictions: Conviction[]
}

export default function HomeConvictions({ title, convictions }: Props) {
  return (
    <div className="bg-orange-500 py-8 md:p-16 xl:px-32">
      <h2 className=" mb-4 md:my-0 text-white text-center md:text-left">{title}</h2>
      <div className="flex flex-col md:flex-row justify-center md:justify-start text-white mb-0 mt-8 md:my-8 lg:my-0 px-4 sm:px-12 md:px-4">
        {convictions.map((conviction, index) => (
          <div
            key={conviction.title}
            className={clsx(
              'flex lg:py-8 lg:my-8 w-full md:w-1/2 text-left justify-between md:justify-start mx-6',
              index % 2 === 0
                ? 'flex-row justify-start lg:pr-8 xl:pr-16'
                : 'flex-row-reverse md:flex-row justify-start lg:pl-8 xl:pl-16 pr-0'
            )}
          >
            <img className="md:m-0 max-w-2xl max-h-2xl md:max-w-5xl md:max-h-5xl" src={conviction.image} />
            <span className={clsx(index % 2 === 0 ? 'pl-4' : 'pr-4', 'flex flex-col justify-center md:px-8')}>
              <h3 className="uppercase font-semibold mb-2 md:mb-4 text-base leading-normal">{conviction.title}</h3>
              <p className="text-xs md:text-sm leading-normal">{conviction.desc}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
