import React from 'react'

import WhitePaperForm from '../components/form/WhitePaperForm'
import Layout from '../components/Layout'

function handleSubmit() {
  // TODO: Send white paper by mail
  alert('ok')
}

export default function whitePaper() {
  return (
    <Layout>
      <>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span className="text-underline">Accueil</span> > <span className="text-underline">Solutions</span>
          </div>
          <h1 className="text-center text-2xl py-8 md:pb-0">
            Titre du livre blanc qui s'affiche sur une ou deux lignes
          </h1>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            At vero eos accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
            corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
            culpa qui officia deserunt mollitia
          </p>
        </div>
        <div className="border border-white md:max-w-md mx-auto mb-8 px-4">
          <div className=" md:px-12 flex flex-col justify-center">
            <WhitePaperForm handleNextStep={handleSubmit} />
          </div>
        </div>

        <div className=" blue-underline my-4" />
      </>
    </Layout>
  )
}
