import React, { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface Props {
  image: string
  logoId: number
  title: string
  onClick(e: React.MouseEvent): void
}

function getLogoPosition(humanPos: number[], logoId: number) {
  if (window && window.innerWidth < 820) {
    if (logoId === 0) {
      return { top: `${humanPos[0] + 25}px`, left: `${humanPos[1] - 85}px` }
    }
    if (logoId === 1) {
      return { top: `${humanPos[0] - 75}px`, left: `${humanPos[1] - 55}px` }
    }
    if (logoId === 2) {
      return { top: `${humanPos[0] - 105}px`, left: `${humanPos[1] + 40}px` }
    }
    if (logoId === 3) {
      return { top: `${humanPos[0] - 75}px`, left: `${humanPos[1] + 110}px` }
    }
    if (logoId === 4) {
      return { top: `${humanPos[0] + 25}px`, left: `${humanPos[1] + 140}px` }
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
      return { top: `${humanPos[0] + 65}px`, left: `${humanPos[1] + 260}px` }
    }
    return { top: '0', left: '0' }
  }
}

function handleHumanPosition(logoId: number) {
  return () => {
    if (
      document.getElementById(`logo-${logoId}`) &&
      document.getElementById('human2') &&
      document.getElementById('expertise-container')
    ) {
      const logoStyle = document.getElementById(`logo-${logoId}`)!.style
      const humanPos = [
        document.getElementById('human2')!.getBoundingClientRect().top -
          document.getElementById('expertise-container')!.getBoundingClientRect().top,
        document.getElementById('human2')!.getBoundingClientRect().left,
      ]

      // eslint-disable-next-line
      // @ts-ignore
      if (document.querySelector('#human2').complete) {
        const logoPosition = getLogoPosition(humanPos, logoId)
        logoStyle.position = 'absolute'

        logoStyle.top = logoPosition.top
        logoStyle.left = logoPosition.left
      } else {
        document.querySelector('#human2')!.addEventListener('load', () => {
          const logoPosition = getLogoPosition(humanPos, logoId)
          logoStyle.position = 'absolute'

          logoStyle.top = logoPosition.top
          logoStyle.left = logoPosition.left
        })
      }
    }
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
    <div id={`logo-${logoId}`} className="flex flex-col justify-center" onClick={onClick}>
      {
        // eslint-disable-next-line
        // @ts-ignore-next-line
        <LazyLoadImage effect="blur" src={image} className="block mx-auto"></LazyLoadImage>
      }
      <p
        className="text-xs text-center font-semibold"
        dangerouslySetInnerHTML={{ __html: title.split(/[\s]/).join('<br/>') }}
      ></p>
    </div>
  )
}
