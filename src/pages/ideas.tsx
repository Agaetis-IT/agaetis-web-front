import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

import Button from '../components/Button'
import CategoryTab from '../components/CategoryTab'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getAllIdeas, getAllWhitePapers, getCategories, getIdeasPageContent } from '../Services/wordpressService'
import { Category, IdeasDesc, IdeasPageContent } from '../types/IdeasContent'
import WhitePaper from '../types/WhitePaper'
import clsx from 'clsx'

interface Props {
  ideasDescription: IdeasDesc[]
  categories: Category[]
  content: IdeasPageContent
  whitePapers: WhitePaper[]
}

function compareIdeasByDate(idea1: IdeasDesc, idea2: IdeasDesc) {
  return new Date(idea2.date).getTime() - new Date(idea1.date).getTime()
}

function Ideas({ ideasDescription, whitePapers, categories, content }: Props) {
  const sortedIdeas = ideasDescription.sort(compareIdeasByDate)

  const [isOpenedMoreIdeas, setIsOpenedMoreIdeas] = useState(false)

  function handleToggleMoreIdeas() {
    setIsOpenedMoreIdeas(!isOpenedMoreIdeas)
  }
  return (
    <>
      <Head>
        <title>Agaetis : nos idées</title>
        <meta property="og:description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <meta name="description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/ideas`} />
      </Head>
      <Layout headerProps={{ invertColors: false }}>
        <div>
          <div className="md:max-w-md mx-auto px-0 md:px-8">
            <div className="text-xs px-4 md:px-0">
              <span>
                <a className="text-underline text-black" href="/">
                  Accueil
                </a>{' '}
                > <b>Idées</b>
              </span>
            </div>
            <h1 className="text-center text-3xl py-8 md:pb-0 md:mt-12">{content.titre}</h1>
            <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-sm leading-normal">
              {content.description}
            </p>
          </div>
          <CategoryTab
            ideasC={sortedIdeas.filter(
              (idea) => !idea.categories.includes('White-paper') && !idea.categories.includes('Jobs')
            )}
            categories={categories.filter(
              (category) => category.categoryName !== 'Jobs' && category.categoryName !== 'White-paper'
            )}
            toggleMore={isOpenedMoreIdeas}
            ideasImg1={content.ideasimg1}
            ideasImg2={content.ideasimg2}
          />
          <Button
            className={clsx(
              'flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto',
              { 'mb-8': whitePapers.length < 2 }
            )}
            onClick={handleToggleMoreIdeas}
          >
            {!isOpenedMoreIdeas ? "Voir plus d'idées" : "Voir moins d'idées"}
          </Button>
          {whitePapers && whitePapers.length > 0 && (
            <div id="whitepapers" className="text-center w-full mx-auto p-6 md:py-12 bg-light-grey my-8 blue-underline">
              <h2 className="text-2xl mt-4">Livres blancs</h2>
              <p className="text-sm md:max-w-md md:px-20 py-4 mx-auto leading-normal">
                {content.white_paper_description}
              </p>
              <div className="my-4 md:my-8 flex flex-col md:flex-row justify-center md:max-w-md mx-auto">
                {whitePapers.slice(0).map((whitePaper) => (
                  <div key={whitePaper.title} className="mb-4 md:m-0">
                    <div
                      style={{
                        background: whitePaper.miniature ? 'url(' + whitePaper.miniature + ')' : '#333F48',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      className="shadow-xl md:w-ideas h-40 md:h-32 mx-auto"
                    />
                    <h3 className="text-sm px-3 py-4">{whitePaper.title}</h3>
                    <Link href={`/white-papers/${whitePaper.slug}`}>
                      <Button className="rounded-full uppercase text-white text-xss md:text-cgu font-semibold bg-orange px-8 py-3 md:px-6 md:py-2">
                        Télécharger
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

Ideas.getInitialProps = async () => {
  const ideas = await getAllIdeas()
  const categories = await getCategories()
  const content = await getIdeasPageContent()
  const whitepapers = await getAllWhitePapers()

  console.log(whitepapers)
  return {
    ideasDescription: ideas.map((idea: any) => ({
      id: idea.id,
      title: idea.title.rendered,
      categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
      slug: idea.slug,
      descriptionText: idea.acf.idea_description,
      date: idea.date,
    })),
    whitePapers:
      whitepapers && whitepapers.length > 0
        ? whitepapers.map((whitepaper: { slug: string; acf: WhitePaper }) => ({
            slug: whitepaper.slug,
            ...whitepaper.acf,
          }))
        : [],
    content,
    categories: categories.map((category: any) => ({ categoryId: category.id, categoryName: category.name })),
  }
}

export default Ideas
