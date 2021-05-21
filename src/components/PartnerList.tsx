import clsx from 'clsx'
import React from 'react'

interface Props {
  partners: string[]
  className?: string
}

export default function PartnerList({ partners, className }: Props) {
  return (
    <div className={clsx('', className)}>
      <h2 className="text-orange-500">Quelques acteurs bénéfissiant déjà de cette offre</h2>
      <div className={clsx('flex flex-row md:flex-row flex-wrap justify-between mt-8 md:mt-16')}>
        {partners.map((partner) => (
          <img className="w-24 h-auto md:w-auto md:h-12 m-4" src={partner} key={partner} />
        ))}
      </div>
    </div>
  )
}
