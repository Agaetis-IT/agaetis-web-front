import React from 'react'

import { Color } from './common'

interface Props {
  href?: string
  color: Color
  children: string
  onClick?(e: Event): void
}

function getBgClass(colorProp: Color): string {
  let classBG = 'bg-transparent'
  switch (colorProp) {
    case 'agaetis': {
      classBG = 'bg-agaetis'
      break
    }
  }
  return classBG
}

export default function Button({ href, color, children, onClick }: Props) {
  let button
  if (href !== undefined) {
    button = (
      <a
        href={href}
        className={
          getBgClass(color) +
          ' inline-block text-xs px-6 py-3 leading-none rounded-full uppercase text-white mt-4 md:mt-0'
        }
      >
        {children}
      </a>
    )
  } else {
    button = (
      <div color={color} onClick={onClick}>
        {children}
      </div>
    )
  }

  return <>{button}</>
}
