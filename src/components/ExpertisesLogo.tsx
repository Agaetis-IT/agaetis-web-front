import React from 'react'

interface Props {
  image: string
}

export default function ExpertisesLogo({ image }: Props) {
  return (
    <div>
      <img src={image}></img>
    </div>
  )
}
