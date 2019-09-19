import React from 'react'

import Layout from '../components/Layout'
import SoluceTab from '../components/SoluceTab'

export default function solutions() {
  return (
    <Layout>
      <div className="md:max-w-md mx-auto p-0 md:px-8">
        <div className="text-xs px-4 md:px-0">
          <span className="text-underline">Accueil</span> > <span className="text-underline">Idées</span>
        </div>
        <h1 className="text-center text-2xl py-8">Solutions</h1>
        <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
          At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
          atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
          sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga
        </p>
        <SoluceTab />
      </div>
    </Layout>
  )
}
