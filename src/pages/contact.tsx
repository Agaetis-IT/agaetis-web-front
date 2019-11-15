import React from 'react'

import ContactTab from '../components/ContactForm'
import Layout from '../components/Layout'

import './contact.css'

export default function contact() {
  return (
    <Layout headerProps={{ invertColors: false }}>
      <div className="md:max-w-md mx-auto p-0 md:px-4">
        <div className=" text-xs px-4">
          <span className="text-underline">Accueil</span> > <span className="text-underline">Contact</span>
        </div>
        <h1 className="text-center text-2xl  md:px-8 py-8 md:pb-0">Contact</h1>
        <p className="md:max-w-md mx-auto text-center px-4 md:p-6 mb-8 text-xs leading-normal">
          At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
          atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
          sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga
        </p>
        <ContactTab />
      </div>
    </Layout>
  )
}
