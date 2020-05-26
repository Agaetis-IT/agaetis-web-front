import React from 'react'

interface Props {
  title: string
  desc: string
  image: string
}

export default function OfferCard({ title, desc, image }: Props) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <img src={image} />
    </div>
  )
}
