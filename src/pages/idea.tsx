/* eslint-disable react-hooks/rules-of-hooks */
import clsx from 'clsx'
import { NextPageContext } from 'next'
import Head from 'next/head'
import React, { useMemo, useState } from 'react'

import Button from '../components/Button'
import IdeaContent from '../components/IdeaContent'
import IdeasCard from '../components/IdeasCard'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getIdeaBySlug, getIdeaMeta } from '../Services/wordpressService'
import IdeasContent, { IdeasDesc } from '../types/IdeasContent'
import Meta, { convertMetaAPItoMeta } from '../types/Meta'

import Error from './_error'
import Logo from '../static/icons/Agaetis - Ico logo - Orange.png'
import { escape } from 'querystring'
import ContactSection from '../components/ContactSection'

interface Props {
  data: IdeasContent
  related?: IdeasDesc[]
  meta: Meta
  errorCode?: number
}

interface Context extends NextPageContext {
  query: { slug: string }
}

export default function Idea({ data, related, errorCode, meta }: Props) {
  const [isOpenedMoreIdeas, setIsOpenedMoreIdeas] = useState(false)
  function handleToggleMoreIdeas() {
    setIsOpenedMoreIdeas(!isOpenedMoreIdeas)
  }
  if (!!errorCode) {
    return <Error statusCode={404} />
  }
  const relatedIdeas = useMemo(() => {
    if (!!related) {
      return related.map((idea) => (
        <div key={idea.id} className="md:w-1/3 px-2">
          <IdeasCard
            slug={idea.slug}
            id={idea.id}
            title={idea.title}
            categories={idea.categories}
            className="p-4 my-2 md:h-ideas bg-light-grey"
          >
            {idea.descriptionText}
          </IdeasCard>
        </div>
      ))
    }
    return []
  }, [related])

  return (
    <>
      <Head>
        <title>Agaetis : {data.title}</title>
        <meta property="og:title" content={`Agaetis : ${data.title}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/${data.slug}`} />
        <meta property="og:description" content={meta.description ? meta.description : data.descriptionText} />
        {meta.featuredImage && <meta property="og:image" content={meta.featuredImage} />}
        <meta name="description" content={meta.description ? meta.description : data.descriptionText} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/${data.slug}`} />
        {/*
        // @ts-ignore */}
        <meta name="twitter:label1" value="Temps de lecture" />
        {/*
        // @ts-ignore */}
        <meta name="twitter:data1" value={`${data.readTime} min.`}  />
      </Head>
      <Layout invertColors={false}>
        <div>
          <img src={Logo} id="bg-img-left-idea" alt="logo agaetis"></img>
          <img src={Logo} id="bg-img-right-idea" alt="logo agaetis"></img>
          <IdeaContent content={data} />
          {related && related.length > 0 && (
            <>
              <div className="pb-12 mb-8 blue-underline">
                <h2 className="text-center">Ces idées peuvent vous interesser</h2>

                <div className="md:max-w-md px-4 mt-8 mx-auto flex flex-col md:flex-row justify-center">
                  {relatedIdeas.slice(0, 3)}
                  {isOpenedMoreIdeas && relatedIdeas.slice(3)}
                </div>
                <Button
                  onClick={handleToggleMoreIdeas}
                  className={clsx(
                    related.length < 4 ? 'hidden' : 'flex',
                    'flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 mt-8 text-white font-semibold mx-auto'
                  )}
                >
                  {!isOpenedMoreIdeas ? "Voir plus d'idées" : "Voir moins d'idées"}
                </Button>
              </div>
            </>
          )}
          <ContactSection></ContactSection>
        </div>
      </Layout>
    </>
  )
}

Idea.getInitialProps = async ({ query }: Context) => {
  // tslint:disable-next-line

  const { [0]: data, [1]: meta } = await Promise.all([
    getIdeaBySlug(escape(query.slug)),
    getIdeaMeta(escape(query.slug)),
  ])

  if (!!data.acf || !!data.content) {
    const related = []
    if (!!data.acf) {
      for (const idea of data.acf.related_ideas) {
        const data2 = await getIdeaBySlug(idea.post_name)
        related.push(data2)
      }
    }

    return {
      data: {
        title: data.title.rendered,
        imageUrl: data.acf.idea_image || '',
        date: data.date,
        author: data._embedded.author[0].name,
        categories: data._embedded['wp:term'][0].map((category: { name: string }) => category.name),
        content: data.content.rendered,
        slug: data.slug,
        descriptionText: data.acf.idea_description,
        tags: data._embedded['wp:term'][1].map((tag: { name: string; slug: string }) => {
          return { name: tag.name, slug: tag.slug }
        }),
        readTime: data.content.rendered && Math.floor(data.content.rendered.split(' ').length / 275) ? Math.floor(data.content.rendered.split(' ').length / 275) : '1'
      },
      related: related.map((idea) => {
        return {
          title: idea.title.rendered,
          id: idea.id,
          date: idea.date,
          categories: data._embedded['wp:term'][0].map((category: { name: string }) => category.name),
          slug: idea.slug,
          descriptionText: idea.acf.idea_description,
        }
      }),
      meta: convertMetaAPItoMeta(meta, data._embedded),
    }
  }
  return {
    data: {
      title: '',
      imageUrl: '',
      date: '',
      author: '',
      categories: [],
      content: '',
      slug: '',
    },
    related: {
      title: '',
      id: '',
      date: '',
      categories: [],
      slug: '',
      descriptionText: '',
    },
    meta: {
      description: '',
    },
    errorCode: 404,
  }
}
