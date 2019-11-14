import React from 'react'

import Layout from '../components/Layout'
import SoluceTab from '../components/SoluceTab'
import { getSolutionsPageContent } from '../Services/wordpressService'
import { compareWhyUsSection, SolutionsContent } from '../types/SolutionsContent'

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
          <SoluceTab tabs={pageContent.tabs} />
          <img className="mt-4 shadow-xl w-full" src={pageContent.solutions_img} />
          <div>
            <h2 className="text-2xl font-semibold py-8 text-center">{pageContent.why_us.title}</h2>
            <div className="flex flex-col md:flex-row justify-between">
              {pageContent.why_us.sections.sort(compareWhyUsSection).map(section => (
                <div key={section.index} className="md:w-1/3 p-2 flex flex-col align-middle">
                  <img className="w-24 h-24 mx-auto text-center mb-4" src={section.icon} />
                  <div>
                    <h3 className="text-lg uppercase text-center">{section.title}</h3>
                    <p className="text-xs leading-normal text-center py-2">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-grey blue-underline px-4 py-8 my-4">
          <h2 className="text-2xl font-semibold text-center">{pageContent.partnerTitle}</h2>
          <div className="flex flex-row flex-wrap justify-center p-4">
            {pageContent.partners.map(partner => (
              <img
                style={{
                  width: '100 %',
                  height: '100 %',
                  objectFit: 'contain',
                }}
                key={partner}
                className="m-2"
                src={partner}
              />
            ))}
          </div>
        </div>
      </>
    </Layout>
  )
}
