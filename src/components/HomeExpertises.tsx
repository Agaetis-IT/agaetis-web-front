import React, { useState } from 'react'

import Trigramme from './Trigramme'

import './HomeExpertises.css'
import ExpertisesLogo from './ExpertisesLogo'
import Button from './Button'
import { Expertise } from '../types/IndexContent'

/* eslint-disable @typescript-eslint/camelcase */
interface Props {
  expertises_title: string
  expertises_image_desktop: string
  expertises_image_mobile: string
  expertises: Expertise[]
}

export default function HomeExpertises({
  expertises_title,
  expertises_image_desktop,
  expertises_image_mobile,
  expertises,
}: Props) {
  const [selectedExpertise, setSelectedExpertise] = useState(0)
  const handleExpertiseChange = (expertiseId: number) => {
    return () => {
      setSelectedExpertise(expertiseId)
    }
  }
  return (
    <>
      <div className="hidden lg:block  md:p-16 xl:px-32">
        <h2 className="text-orange font-semibold text-center md:text-left">{expertises_title}</h2>
        <div className="md:mt-36 md:mb-16">
          <img src={expertises_image_desktop} className="block mx-auto " id="human"></img>
          {expertises && expertises.length > 4 && (
            <>
              <Trigramme
                imageUrl={expertises[0].trigram}
                TrigramOrder={0}
                line="L"
                lineClassName="line-L-0"
              ></Trigramme>
              <Trigramme
                imageUrl={expertises[1].trigram}
                TrigramOrder={1}
                line="L"
                lineClassName="line-L-1"
              ></Trigramme>
              <Trigramme
                imageUrl={expertises[2].trigram}
                TrigramOrder={2}
                line="R"
                lineClassName="line-R-0"
              ></Trigramme>
              <Trigramme
                imageUrl={expertises[3].trigram}
                TrigramOrder={3}
                line="R"
                lineClassName="line-R-1"
              ></Trigramme>
              <Trigramme
                imageUrl={expertises[4].trigram}
                TrigramOrder={4}
                line="R"
                lineClassName="line-R-2"
              ></Trigramme>
            </>
          )}
        </div>
      </div>
      <div className="block lg:hidden py-8 md:p-16">
        <h2 className="text-orange font-semibold text-center md:text-left">{expertises_title}</h2>
        <img src={expertises_image_mobile} className="block mx-auto mt-36 mb-16" id="human2"></img>
        {expertises.map((icon) => (
          <ExpertisesLogo
            image={icon.logo}
            logoId={icon.index - 1}
            title={icon.title}
            onClick={handleExpertiseChange(icon.index - 1)}
            key={icon.title}
          ></ExpertisesLogo>
        ))}
        {expertises[selectedExpertise] && (
          <div className="bg-light-grey p-8 shadow-xl">
            <img src={expertises[selectedExpertise].logo} className="block mx-auto"></img>
            <h3 className="text-center mt-4 mb-8">{expertises[selectedExpertise].title}</h3>
            <p className="text-center text-sm">{expertises[selectedExpertise].items.split(',').join(' - ')}</p>
            <Button className="block mx-auto bg-white rounded-full shadow-md px-4 py-2 text-orange font-semibold text-xs mt-4">
              En savoir plus
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
