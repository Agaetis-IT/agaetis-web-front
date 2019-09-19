import clsx from 'clsx'
import React from 'react'

interface Soluce {
  index: number
  sections: Array<{ title: string; content: string }>
}

interface Props {
  content: Soluce
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
          dangerouslySetInnerHTML={{ __html: content.sections[0].content }}
        />
      </div>
      <div className={clsx('md:w-1/2 md:pl-4')}>
        <h2
          className="text-xl font-semibold py-4 text-center"
          dangerouslySetInnerHTML={{ __html: content.sections[1].title }}
        />
        <p
          className="text-xs text-justify leading-normal"
          dangerouslySetInnerHTML={{ __html: content.sections[1].content }}
        />
      </div>
    </div>
  )
}
