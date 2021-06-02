import React from 'react'

import './HomeConvictions.css'
import clsx from 'clsx'
import { Conviction } from '../types/IndexContent'

interface Props {
  title: string
  convictions: Conviction[]
}

export default function HomeConvictions({ title, convictions }: Props) {
  return (
    <div className="bg-orange p-4 md:p-16 lg:px-24 lg:p-16 shadow-md">
      <h2 className="mb-6 mt-2 md:my-0 text-white text-center md:text-left">{title}</h2>
      <div className="convictions-container text-white mb-0 mt-8 md:my-8 lg:my-0">
        {convictions.map((conviction, index) => (
          <div
            key={conviction.title}
            className={clsx(
              'flex lg:py-8 lg:my-8 conviction-item ',
              index % 2 === 0
                ? 'flex-row justify-start lg:pr-8 xl:pr-16'
                : 'flex-row-reverse md:flex-row justify-start lg:pl-8 xl:pl-16 pr-0'
            )}
          >
            <img src={conviction.image} />
            <span className={clsx(index % 2 === 0 ? 'pl-4' : 'pr-4', 'flex flex-col justify-center md:px-8')}>
              <h3 className="uppercase font-semibold mb-2 md:mb-4 text-base">{conviction.title}</h3>
              <p className="text-xs md:text-sm">{conviction.desc}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
