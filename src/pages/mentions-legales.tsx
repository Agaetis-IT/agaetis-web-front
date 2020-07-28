import React from 'react'

import Layout from '../components/Layout'
import { getMentionsLegalesContent } from '../Services/wordpressService'
import MentionsLegalesContent from '../types/MentionsLegalesContent'

import './personal-data.css'

interface Props {
  pageContent: MentionsLegalesContent
}

export default function mentionsLegales({ pageContent }: Props) {
  return (
    <Layout invertColors={false}>
      <>
        <div className="md:max-w-md mx-auto px-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <div className="text-xs">
              <span>
                <a className="text-underline text-black" href="/">
                  Accueil
                </a>
                {' > '} <b dangerouslySetInnerHTML={{ __html: pageContent.title }} />
              </span>
            </div>
            <h1
              className="text-center text-2xl py-8 md:pb-0 md:mt-12"
              dangerouslySetInnerHTML={{ __html: pageContent.title }}
            />
            <div
              className="md:max-w-md mx-auto text-justify px-4 md:py-6 md:px-0 md:mt-8 text-sm leading-normal personal-data"
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            />
          </div>
        </div>
      </>
    </Layout>
  )
}

mentionsLegales.getInitialProps = async () => {
  const data = await getMentionsLegalesContent()
  return {
    pageContent: {
      title: data.title.rendered,
      content: data.content.rendered,
    },
  }
}
