import React from 'react'

import JobsCarousel from '../components/JobsCarousel'
import Layout from '../components/Layout'
import JobsMini from '../images/Jobs_miniature.png'
import { getJobsPageContent } from '../Services/wordpressService'

jobs.getInitialProps = async () => {
  const pageContent = await getJobsPageContent()
  return { pageContent }
}

export default function jobs() {
  return (
    <Layout>
      <div className="md:max-w-md mx-auto p-0 md:px-8">
        <div className="text-xs px-4 md:px-0">
          <span className="text-underline">Accueil</span> > <span className="text-underline">Jobs</span>
        </div>
        <h1 className="text-center text-2xl py-8">Jobs</h1>
        <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
          Depuis 2007, la croissance d'agaetis a été progressive et maîtrisée afin de garantir la continuité de cet
          écosystème passionant. nous sommes maintenant une équipe de 22 salariés, complémentaires et désireux d'en
          apprendre tous les hours. Agaetis travaille avec des start-ups, PME et grands groupes de différents secteurs :
          Industrie, Agriculture, Bâtiment, Santé, Finance, Assurance, E-commerce ...
        </p>
        <img className="mx-auto md:mx-0 shadow-xl m-4" src={JobsMini} alt="miniature" />
        <JobsCarousel slideMax={2} />
      </div>
    </Layout>
  )
}
