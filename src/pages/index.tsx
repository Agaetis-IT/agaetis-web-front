import Link from 'next/link'
import React from 'react'

import Button from '../components/Button'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import WhoAreWe from '../images/qui-sommes-nous.png'

import './index.css'

export default function Index() {
  return (
    <Layout headerProps={{ invertColors: true, className: 'header md:absolute md:mx-auto' }}>
      <>
        <Hero />
        <div className="flex flex-col md:flex-row my-6 md:my-12 justify-center ">
          <div className="max-w-xs mx-4 md:pr-12 self-center">
            <h2 className="pb-4">Qui sommes-nous ?</h2>
            <p className="text-xs leading-tight">
              Depuis 2007, nous aidons les entreprises à relever les défis des nouvelles technologies informatiques.
              Parce que ce domaine doit allier passion et réalité économique, notre équipe relète l'image des nouvelles
              organisations mélangeant experts techniques, data scientists, coachs en organisation, service designers et
              spécialistes métier. Notre culture apporte à nos clients des clés de succès dans cette période de
              transition économique et sociétale.
            </p>
            <Link href="/agaetis">
              <Button
                href="/agaetis"
                className="px-6 py-2 leading-none rounded-full uppercase mt-4 mb-6 md:mb-0 bg-orange text-white text-xs font-semibold inline-block"
              >
                En savoir plus
              </Button>
            </Link>
          </div>
          <img className="blogImage mx-auto md:mx-0" src={WhoAreWe} />
        </div>
      </>
    </Layout>
  )
}
