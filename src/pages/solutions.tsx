import React from 'react'

import { getBugsnagClient } from '../bugsnag/bugsnag'
import Layout from '../components/Layout'
import SoluceTab from '../components/SoluceTab'
import { getSolutionsPageContent } from '../Services/wordpressService'
import { SolutionsContent } from '../types/SolutionsContent'

import './solutions.css'

interface Props {
  pageContent: SolutionsContent
}

solutions.getInitialProps = async () => {
  const pageContent = await getSolutionsPageContent()
  return { pageContent }
}

export default function solutions({ pageContent }: Props) {
  return (
    <Layout>
      <>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span>
              <a className="text-underline text-black" href="/">
                Accueil
              </a>{' '}
              > <b>Solutions</b>
            </span>
          </div>
          <h1 className="text-center text-2xl py-8 md:pb-0">{pageContent.title}</h1>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            {pageContent.description}
          </p>
        </div>
        <SoluceTab tabs={pageContent.tabs} />
      </>
    </Layout>
  )
}
