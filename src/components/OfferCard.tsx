import Link from 'next/link'
import React from 'react'

interface Props {
  title: string
  description: string
  href: string
  className?: string
}

export default function OfferCard({ title, description, href, className }: Props) {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className="text-xs py-4">{description}</p>
      <Link href={href}>
        <a className="text-blue text-xs blue-underline-thin">Consulter l'offre</a>
      </Link>
    </div>
  )
}
