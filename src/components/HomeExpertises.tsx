import React from 'react'
import Human from '../static/images/human1.svg'
import Trigramme from './Trigramme'

import Trigram1 from '../static/images/trigram1.png'
import Trigram2 from '../static/images/trigram2.png'
import Trigram3 from '../static/images/trigram3.png'
import Trigram4 from '../static/images/trigram4.png'
import Trigram5 from '../static/images/trigram5.png'

export default function HomeExpertises() {
  return (
    <div className=" py-8 md:p-16 xl:px-32">
      <h2 className="text-orange font-semibold text-center md:text-left">
        Nos expertises : les clés de réussite de vos projets technologiques
      </h2>
      <div className="md:mt-36 md:mb-8">
        <img src={Human} className="block mx-auto " id="human"></img>

        <Trigramme imageUrl={Trigram3} TrigramOrder={0} line="L" lineClassName="line-L-0"></Trigramme>
        <Trigramme imageUrl={Trigram4} TrigramOrder={1} line="L" lineClassName="line-L-1"></Trigramme>
        <Trigramme imageUrl={Trigram5} TrigramOrder={2} line="R" lineClassName="line-R-0"></Trigramme>
        <Trigramme imageUrl={Trigram2} TrigramOrder={3} line="R" lineClassName="line-R-1"></Trigramme>
        <Trigramme imageUrl={Trigram1} TrigramOrder={4} line="R" lineClassName="line-R-2"></Trigramme>
      </div>
    </div>
  )
}
