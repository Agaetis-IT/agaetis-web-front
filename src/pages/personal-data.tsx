import Link from 'next/link'
import React from 'react'

import Layout from '../components/Layout'
import { getPersonalDataContent } from '../services/wordpressService'
import PersonalDataContent from '../types/PersonalDataContent'

import styles from '../styles/personal-data.module.css'

interface Props {
  pageContent: PersonalDataContent
}

export default function personalData({ pageContent }: Props) {
  return (
    <Layout invertColors={false}>
      <>
        <div className="mx-auto px-0">
          <div className="p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
            <div className="md:max-w-md mx-auto p-0 md:px-8 mt-0 md:mt-20">
              <div className="text-xs leading-normal px-4 md:px-0 ">
                <div className="text-xs leading-normal">
                  <span>
                    <Link href="/">
                      <a className="underline text-black">Accueil</a>
                    </Link>
                    {' > '} <b dangerouslySetInnerHTML={{ __html: pageContent.title }} />
                  </span>
                </div>
                <h1
                  className="text-center text-2xl leading-normal py-8 md:pb-0 md:mt-12"
                  dangerouslySetInnerHTML={{ __html: pageContent.title }}
                />
              </div>
              <div
                className={`md:max-w-md mx-auto text-justify px-4 md:py-6 md:px-0 md:mt-8 text-sm leading-normal ${styles.personalData}`}
                dangerouslySetInnerHTML={{ __html: pageContent.content }}
              />
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

personalData.getInitialProps = async () => {
  const data = await getPersonalDataContent()
  return {
    pageContent: {
      title: data.title.rendered,
      content: data.content.rendered,
    },
  }
}
