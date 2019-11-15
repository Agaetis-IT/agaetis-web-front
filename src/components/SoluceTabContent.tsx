import clsx from 'clsx'
import React from 'react'

import { Tab } from '../types/SolutionsContent'

interface Props {
  content: Tab
  className: string
}

export default function SoluceTabContent({ content, className }: Props) {
  return (
    <div className={clsx(className, 'p-4')}>
      <div className={clsx('md:w-1/2 md:pr-4')}>
        <h2
          className="text-xl font-semibold py-4 text-center"
          dangerouslySetInnerHTML={{ __html: content.sections[0].title }}
        />
        <p
          className="text-xs text-justify leading-normal"
          dangerouslySetInnerHTML={{ __html: content.sections[0].description }}
        />
      </div>
      <div className={clsx('md:w-1/2 md:pl-4')}>
        <h2
          className="text-xl font-semibold py-4 text-center"
          dangerouslySetInnerHTML={{ __html: content.sections[1].title }}
        />
        <p
          className="text-xs text-justify leading-normal"
          dangerouslySetInnerHTML={{ __html: content.sections[1].description }}
        />
      </div>
    </div>
  )
}
