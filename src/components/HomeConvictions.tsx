import React from 'react'

import './HomeConvictions.css'
import clsx from 'clsx'
import { Conviction } from '../types/IndexContent'

interface Props {
  convictions: Conviction[]
}

export default function HomeConvictions({ convictions }: Props) {
  return (
    <div className="bg-orange py-8 md:p-16 xl:px-32">
      <h2 className="mt-8 mb-4 md:my-0 text-white text-center md:text-left">Nos convictions</h2>
      <div className="convictions-container text-white my-8 lg:my-0 px-4 sm:px-12 md:px-4">
        {convictions.map((conviction, index) => (
          <div
            key={conviction.title}
            className={clsx(
              'flex lg:py-8 lg:my-8 conviction-item',
              index % 2 === 0 ? 'flex-row lg:pr-8 xl:pr-16' : 'flex-row-reverse md:flex-row lg:pl-8 xl:pl-16 pr-0'
            )}
          >
            <img src={conviction.image}></img>
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
