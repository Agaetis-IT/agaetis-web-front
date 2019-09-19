import Link from 'next/link'
import React from 'react'

import JobsCarousel from '../components/JobsCarousel'
import Layout from '../components/Layout'
import OfferSection from '../components/OfferSection'
import JobsMini from '../images/Jobs_miniature.png'
import { getJobsPageContent } from '../Services/wordpressService'

jobs.getInitialProps = async () => {
  const pageContent = await getJobsPageContent()
  return { pageContent }
}

const steps = [
  {
    index: 0,
    title: 'Titre étape une ligne',
    description:
      'Sed in sem facilisis, lacina purus vitae, faucibus sapien. Duis tincidunt turpis ac molestie sodales. Cras gravida mi eu lacus gravida maximus',
  },
  {
    index: 1,
    title: 'Titre étape une ligne',
    description:
      'Sed in sem facilisis, lacina purus vitae, faucibus sapien. Duis tincidunt turpis ac molestie sodales. Cras gravida mi eu lacus gravida maximus',
  },
  {
    index: 2,
    title: 'Titre étape une ligne',
    description:
      'Sed in sem facilisis, lacina purus vitae, faucibus sapien. Duis tincidunt turpis ac molestie sodales. Cras gravida mi eu lacus gravida maximus',
  },
]

const offers = [
  {
    index: 0,
    title: 'Intitulé du poste #1',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    index: 1,
    title: 'Intitulé du poste #2',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    index: 2,
    title: 'Intitulé du poste #3',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
]

const profiles = [
  {
    index: 0,
    title: 'passioné',
    description: 'Enthousiaste, avide de connaissances et de nouveauté.',
  },
  {
    index: 1,
    title: 'explorateur',
    description:
      "Curieux et innovant, il ose essayer de nouveaux concepts. Il va là où personne n'a jamais oser s'aventurer !",
  },
  {
    index: 2,
    title: 'lucide',
    description: "Réaliste, pragmatique et sensé. il sait comprendre les enjeux des clients et de l'entreprise.",
  },
  {
    index: 3,
    title: 'rebelle',
    description: 'Insurgé du code ! Révolutionnaire et tenace... Il a son mot à dire et débattre sur ses idées.',
  },
]

export default function jobs() {
  return (
    <Layout>
      <>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span className="text-underline">Accueil</span> > <span className="text-underline">Jobs</span>
          </div>
          <h1 className="text-center text-2xl py-8">Jobs</h1>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            Depuis 2007, la croissance d'agaetis a été progressive et maîtrisée afin de garantir la continuité de cet
            écosystème passionant. nous sommes maintenant une équipe de 22 salariés, complémentaires et désireux d'en
            apprendre tous les hours. Agaetis travaille avec des start-ups, PME et grands groupes de différents secteurs
            : Industrie, Agriculture, Bâtiment, Santé, Finance, Assurance, E-commerce ...
          </p>
          <img className="mx-auto md:mx-0 shadow-xl m-4 w-full" src={JobsMini} alt="miniature" />
          <JobsCarousel slideMax={2} />
        </div>
        <div className="flex flex-col bg-black text-white text-center p-12 my-8">
          <h2 className="">We are Agaetis</h2>
          <p className="md:max-w-md p-8 pb-0 self-center text-xs leading-normal">
            Nos clients sont animés par le pouvoir des données et la capacité à se projeter sur les besoins de demain.
            Notre culture d'entreprise nous permet de d'avoir une vision globale des enjeux de nos clients, de pouvoir
            les accompagner dans les phases de réflexion stratégique, d'idéation et cela jusqu'à la réalisation.
            <br />
            <br />
            Pours nous, les activités de conseil et de réalisation sont liées. Tous nos Data-Scientist, Architectes et
            Développeurs savent prendre de la hauteur et nous Coachs agiles et UX comprennent parfaitement les enjeux
            des projets technologiques. Chez Agaetis, nous aimons co-construire les projets avec nos clients et
            n'hésitons pas à mettre les mains dans le cambouis. Rejoindre Agaetis, c'est rejoindre une équipe de
            passionés portée sur les enjeux futurs pour construire l'Agaetis de demain!
          </p>
        </div>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <h2 className="text-center">Comment nous rejoindre ?</h2>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            Si l'aventure t'intéresse, viens nous rencontrer autour d'un café ! Dans un premier temps, nous réalisons un
            entretien RG afin de valider tes atouts, tes compétences et tes envies. Souvent dans la foulée ou dans un
            second temps, tu rencontreras plusieurs membres de l'équipe afin de rentrer plus en détail dans la technique
            et de te challenger. Pas de piège, nous souhaitons voir comment tu réfléchis, les méthodes que tu utilises
            et ton niveau général. Si ttout s'est bien passé, un dernier entretien à lieu avec au moins l'un des
            fondateurs.
          </p>
          <div className="flex flex-row">
            {steps.map(step => (
              <div className="flex flex-col justify-center mx-2 w-1/3" key={step.index}>
                <div className="text-center text-white text-lg flex flex-row justify-center leading-none self-center items-center w-8 h-8 bg-red-light rounded-full  my-2">
                  <span>{step.index + 1}</span>
                </div>
                <h3 className="uppercase text-lg font-semibold my-2">{step.title}</h3>
                <p className="text-center leading-normal text-xss my-2">{step.description}</p>
              </div>
            ))}
          </div>
          <hr className="Footer-separator my-8" />
          <h2 className="text-center mb-8">Le candidat idéal est ...</h2>
          <div className="flex flex-row">
            {profiles.map(profile => (
              <div className="text-center flex flex-col mx-2 w-1/4" key={profile.index}>
                <h3 className="uppercase text-lg font-semibold my-2">{profile.title}</h3>
                <p className="text-center leading-normal text-xss my-2">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-grey p-12 mt-8">
          <h2 className="text-center mb-8">Nos offres</h2>
          <div className="flex flex-col">
            {offers.map(offer => (
              <div key={offer.index} className="bg-white md:max-w-md p-4 my-2 self-center">
                <h4>{offer.title}</h4>
                <p className="text-xs py-4">{offer.description}</p>
                <Link href="#">
                  <a href="#" className="text-blue text-xs blue-underline-thin">
                    Consulter l'offre
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <OfferSection />
      </>
    </Layout>
  )
}
