import React, { useEffect } from 'react'

interface Props {
  image: string
  logoId: number
  title: string
  onClick(e: React.MouseEvent): void
}

function getLogoPosition(humanPos: number[], logoId: number) {
  if (window && window.innerWidth < 800) {
    if (logoId === 0) {
      return { top: `${humanPos[0] + 65}px`, left: `${humanPos[1] - 85}px` }
    }
    if (logoId === 1) {
      return { top: `${humanPos[0] - 35}px`, left: `${humanPos[1] - 55}px` }
    }
    if (logoId === 2) {
      return { top: `${humanPos[0] - 65}px`, left: `${humanPos[1] + 40}px` }
    }
    if (logoId === 3) {
      return { top: `${humanPos[0] - 35}px`, left: `${humanPos[1] + 110}px` }
    }
    if (logoId === 4) {
      return { top: `${humanPos[0] + 65}px`, left: `${humanPos[1] + 140}px` }
    }
    return { top: '0', left: '0' }
  } else {
    if (logoId === 0) {
      return { top: `${humanPos[0] + 65}px`, left: `${humanPos[1] - 100}px` }
    }
    if (logoId === 1) {
      return { top: `${humanPos[0] - 45}px`, left: `${humanPos[1] - 65}px` }
    }
    if (logoId === 2) {
      return { top: `${humanPos[0] - 105}px`, left: `${humanPos[1] + 90}px` }
    }
    if (logoId === 3) {
      return { top: `${humanPos[0] - 45}px`, left: `${humanPos[1] + 245}px` }
    }
    if (logoId === 4) {
      return { top: `${humanPos[0] + 65}px`, left: `${humanPos[1] + 280}px` }
    }
    return { top: '0', left: '0' }
  }
}

function handleHumanPosition(logoId: number) {
  return () => {
    const logoStyle = document.getElementById(`logo-${logoId}`).style
    const humanPos = [
      document.getElementById('human2').getBoundingClientRect().top - document.body.getBoundingClientRect().top,
      document.getElementById('human2').getBoundingClientRect().left,
    ]
    const logoPosition = getLogoPosition(humanPos, logoId)
    logoStyle.position = 'absolute'

    logoStyle.top = logoPosition.top
    logoStyle.left = logoPosition.left
  }
}

export default function ExpertisesLogo({ image, logoId, title, onClick }: Props) {
  useEffect(() => {
    if (window && document) {
      handleHumanPosition(logoId)()
      window.addEventListener('resize', handleHumanPosition(logoId))
    }
    return () => {
      window.removeEventListener('resize', handleHumanPosition(logoId))
    }
  }, [logoId])

  return (
    <div id={`logo-${logoId}`} className="" onClick={onClick}>
      <img src={image} className="block mx-auto"></img>
      <p
        className="text-xs text-center font-semibold"
        dangerouslySetInnerHTML={{ __html: title.split(/[\s]/).join('<br/>') }}
      ></p>
    </div>
  )
}
