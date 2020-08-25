import React, { useState } from 'react'

import Trigramme from './Trigramme'

import Human from '../static/images/human1.svg'
import Human2 from '../static/icons/ExpertisesM.svg'

import Trigram1 from '../static/images/trigram1.png'
import Trigram2 from '../static/images/trigram2.png'
import Trigram3 from '../static/images/trigram3.png'
import Trigram4 from '../static/images/trigram4.png'
import Trigram5 from '../static/images/trigram5.png'
import CustomerC from '../static/icons/ux.png'
import Organisation from '../static/icons/organisation.png'
import Data from '../static/icons/datascience.png'
import Dev from '../static/icons/dev.png'
import Secu from '../static/icons/cyber-secu.png'

import './HomeExpertises.css'
import ExpertisesLogo from './ExpertisesLogo'
import Button from './Button'

const icons = [
  { index: 0, title: 'Customer Centric', image: CustomerC, items: 'UX, Service design' },
  {
    index: 1,
    title: 'Pilotage/ Organisation',
    image: Organisation,
    items: 'Exploration, Culture data, Transformation',
  },
  { index: 2, title: 'Data', image: Data, items: 'IA, R&D, Simulation, Data quality, Data science' },
  { index: 3, title: 'Développement', image: Dev, items: 'Cloud, Big data, Craftsmanship, Objets connectés' },
  { index: 4, title: 'Sécurité/ Réglementaire', image: Secu, items: 'GDPR, Security by design' },
]

export default function HomeExpertises() {
  const [selectedExpertise, setSelectedExpertise] = useState(0)
  const handleExpertiseChange = (expertiseId: number) => {
    return () => {
      setSelectedExpertise(expertiseId)
    }
  }
  return (
    <>
      <div className="hidden lg:block  md:p-16 xl:px-32">
        <h2 className="text-orange font-semibold text-center md:text-left">
          Nos expertises : les clés de réussite de vos projets technologiques
        </h2>
        <div className="md:mt-36 md:mb-16">
          <img src={Human} className="block mx-auto " id="human"></img>
          <Trigramme imageUrl={Trigram3} TrigramOrder={0} line="L" lineClassName="line-L-0"></Trigramme>
          <Trigramme imageUrl={Trigram4} TrigramOrder={1} line="L" lineClassName="line-L-1"></Trigramme>
          <Trigramme imageUrl={Trigram5} TrigramOrder={2} line="R" lineClassName="line-R-0"></Trigramme>
          <Trigramme imageUrl={Trigram2} TrigramOrder={3} line="R" lineClassName="line-R-1"></Trigramme>
          <Trigramme imageUrl={Trigram1} TrigramOrder={4} line="R" lineClassName="line-R-2"></Trigramme>
        </div>
      </div>
      <div className="block lg:hidden py-8 md:p-16">
        <h2 className="text-orange font-semibold text-center md:text-left">
          Nos expertises : les clés de réussite de vos projets technologiques
        </h2>
        <img src={Human2} className="block mx-auto mt-36 mb-16" id="human2"></img>
        {icons.map((icon) => (
          <ExpertisesLogo
            image={icon.image}
            logoId={icon.index}
            title={icon.title}
            onClick={handleExpertiseChange(icon.index)}
            key={icon.title}
          ></ExpertisesLogo>
        ))}
        {icons[selectedExpertise] && (
          <div className="bg-light-grey p-8 shadow-xl">
            <img src={icons[selectedExpertise].image} className="block mx-auto"></img>
            <h3 className="text-center mt-4 mb-8">{icons[selectedExpertise].title}</h3>
            <p className="text-center text-sm">{icons[selectedExpertise].items.split(',').join(' - ')}</p>
            <Button className="block mx-auto bg-white rounded-full shadow-md px-4 py-2 text-orange font-semibold text-xs mt-4">
              En savoir plus
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
