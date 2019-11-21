import React from 'react'

import AgaetisCard from '../components/AgaetisCard'
import Layout from '../components/Layout'
import ImgH from '../static/images/histoire.png'
import Img from '../static/images/Idees.png'
import ImgI from '../static/images/innovation.png'

export default function agaetis() {
  return (
    <Layout headerProps={{ invertColors: false }}>
      <div className="mx-auto px-0 ">
        <div className="md:max-w-md mx-auto text-xs md:px-8 md:px-0">
          <span>
            <a className="text-underline text-black" href="/">
              Accueil
            </a>{' '}
            > <b>Agaetis</b>
          </span>
        </div>
        <div className="md:max-w-md mx-auto md:px-8">
          <h1 className="text-center text-2xl py-8 md:pb-0">Agaetis</h1>
          <p className=" text-center px-8 md:py-6 md:px-0 text-xs leading-normal">
            At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
            atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
            sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga{' '}
          </p>
        </div>
        <div className="px-2 md:px-6">
          <AgaetisCard
            className="md:flex-row"
            title="Vision"
            description="Les nouvelles technologies ont un rôle important dans les changements sociétaux et sociaux et économiques qui s'opèrent. Mais ces technologies doivent être au service de l'homme et non l'inverse, c'est pour cela que nous travaillons tous nos dispositifs où l'humain est au coeur de la réflexion."
            descBlockClass=""
            imgShadow
            imgUrl={Img}
          />
          <AgaetisCard
            className="md:flex-row-reverse py-6 bg-grey"
            title="Innovation"
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecti beatea vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni."
            descBlockClass=""
            imgUrl={ImgI}
          />
          <AgaetisCard
            className="md:flex-row"
            title="Histoire"
            description="Dès la création en 2007, les fondateurs d'Agaetis d'Agaetis ont la conviction que la data est un enjeu complexe avec des changements profonds. A chaque étape de la vie de la société, nous avons renforcé notre légimité dans ce domaine en développant notre savoir-faire technique, notre management de projet, et notre créativité. Nous avons construit des collaborations importantes avec nos partenaires publics et privés et nos clients. Nous avons recruté les talents et oeuvré au travail en équipe. Chaque jour, l'histoire continue de s'écrire avec une rapidité et une richesse, c'est la notre véritable savoir-faire, et cela n'est que le début de l'histoire."
            descBlockClass=""
            imgShadow
            imgUrl={ImgH}
          />
        </div>
      </div>
    </Layout>
  )
}
