import React from 'react'

import AgaetisCard from '../components/AgaetisCard'
import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'
import { getAgaetisContent } from '../Services/wordpressService'
import { AgaetisContent, convertAgaetisAPItoContent } from '../types/AgaetisContent'

interface Props {
  pageContent: AgaetisContent
}

agaetis.getInitialProps = async () => {
  const pageContent = await getAgaetisContent()
  return { pageContent: convertAgaetisAPItoContent(pageContent) }
}

export default function agaetis({ pageContent }: Props) {
  return (
    <Layout headerProps={{ invertColors: false }}>
      <div className="mx-auto px-0">
        <div className="md:max-w-md mx-auto text-xs px-4 md:px-8 ">
          <span>
            <a className="text-underline text-black" href="/">
              Accueil
            </a>{' '}
            > <b>Agaetis</b>
          </span>
        </div>
        <div className="md:max-w-md mx-auto md:px-8">
          <h1 className="text-center text-2xl py-8 md:pb-0">{pageContent.title}</h1>
          <p className=" text-center px-4 md:py-6 md:px-0 text-xs leading-normal">{pageContent.paragraph}</p>
        </div>
        <div className=" md:px-6">
          <AgaetisCard
            className="md:flex-row"
            title={pageContent.vision_title}
            description={pageContent.vision_paragraph}
            descBlockClass=""
            imgShadow
            imgUrl={pageContent.vision_img}
          />
          <AgaetisCard
            className="md:flex-row-reverse py-6 bg-light-grey"
            title={pageContent.innovation_title}
            description={pageContent.innovation_paragraph}
            descBlockClass=""
            imgUrl={pageContent.innovation_img}
          />
          <AgaetisCard
            className="md:flex-row"
            title={pageContent.histoire_title}
            description={pageContent.histoire_paragraph}
            descBlockClass=""
            imgShadow
            imgUrl={pageContent.histoire_img}
          />
        </div>
        <div className="mb-8 md:mb-16">
          <h2 className="text-center mt-12 mb-8">{pageContent.chiffres_title}</h2>
          <div className="md:max-w-md mx-auto md:px-8 flex flex-col md:flex-row justify-around bg-light-grey p-8">
            {pageContent.chiffres.map(chiffre => (
              <div key={chiffre.title} className="text-center my-6 md:my-0 mx-2">
                <h3 className="uppercase text-xs ">{chiffre.title}</h3>
                <h3 className="text-4xl text-orange my-2 md:my-4">{chiffre.data}</h3>
                <p className="text-xs">{chiffre.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <ContactSection />
      </div>
    </Layout>
  )
}
