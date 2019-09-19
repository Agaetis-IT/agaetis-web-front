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
      <div className={clsx('w-1/2')}>
        <h2 className="text-xl font-semibold py-4 text-center">{content.sections[0].title}</h2>
        <p className="text-xs">{content.sections[0].content}</p>
      </div>
      <div className={clsx('w-1/2')}>
        <h2 className="text-xl font-semibold py-4 text-center">{content.sections[1].title}</h2>
        <p className="text-xs">{content.sections[1].content}</p>
      </div>
    </div>
  )
}
