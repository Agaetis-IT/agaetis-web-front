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
import Particles from '../static/images/particles-3.svg'

import Error from './_error'
import { escape } from 'querystring'
import ContactSection from '../components/ContactSection'
import ContactForm from '../components/ContactForm'
import { FormInput } from '../yup/ContactFormValidation'
import send from '../Services/contactService'
import ContactMessage from '../components/ContactMessage'
import { formatPostAuthors } from '../Services/textUtilities'

import '../components/Common.css'

import { PostAPI } from '../models/IdeasAPI'
import { AuthorLink } from '../types/AuthorContent'

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
  const [isOpenenedModal, setOpenModal] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isSubmited, setIsSubmited] = useState(false)

  function handleOpenModal(error: boolean) {
    setIsError(error)
    setOpenModal(true)
    setIsSubmited(false)
    setTimeout(() => {
      setOpenModal(false)
    }, 3000)
  }

  async function handleSubmit(data: FormInput) {
    try {
      setIsSubmited(true)
      await send(
        data.firstname,
        data.lastname,
        data.mail,
        data.subject,
        data.message,
        data.phone,
        new Date(),
        data.captcha,
        data.attachments
      )
      handleOpenModal(false)
    } catch {
      handleOpenModal(true)
    }
  }

  function handleToggleMoreIdeas() {
    setIsOpenedMoreIdeas(!isOpenedMoreIdeas)
  }

  if (!!errorCode) {
    return <Error statusCode={404} />
  }

  const relatedIdeas = useMemo(() => {
    if (!!related) {
      return related.map((idea) => (
        <div key={idea.id} className="m-2 mb-8 shadow-md hover:shadow-lg smooth-transition zoom-in round8">
          <IdeasCard slug={idea.slug} title={idea.title} image={idea.image} description={idea.descriptionText} />
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
        <meta name="twitter:label1" value="Auteur" />
        {/*
        // @ts-ignore */}
        <meta name="twitter:data1" value={`${formatPostAuthors(data.authors)}`} />
        {/*
        // @ts-ignore */}
        <meta name="twitter:label2" value="Temps de lecture" />
        {/*
        // @ts-ignore */}
        <meta name="twitter:data2" value={`${data.readTime} min.`} />
      </Head>
      <Layout invertColors={false}>
        <div className="pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left top',
              backgroundSize: 'contain',
            }}
            className="bg-light-grey py-4 md:p-16 lg:px-32 xl:px-48"
          >
            <IdeaContent content={data} />
            {related && related.length > 0 && (
              <>
                <div className="p-8 md:py-8 md:px-0">
                  <h2 className="text-center">Ces posts peuvent vous interesser</h2>

                  <div className="mt-8 flex flex-col">
                    {relatedIdeas.slice(0, 5)}
                    {isOpenedMoreIdeas && relatedIdeas.slice(5)}
                  </div>
                  <Button
                    onClick={handleToggleMoreIdeas}
                    className={clsx(
                      related.length < 6 ? 'hidden' : 'flex',
                      'flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 mt-8 text-white font-semibold mx-auto'
                    )}
                  >
                    {!isOpenedMoreIdeas ? 'Voir plus' : 'Voir moins'}
                  </Button>
                </div>
              </>
            )}
          </div>
          <ContactForm
            title="Un sujet vous intéresse ? Une question ? Contactez-nous !"
            handleSubmit={handleSubmit}
            isSubmited={isSubmited}
          ></ContactForm>
          {isOpenenedModal && <ContactMessage error={isError}></ContactMessage>}
          <ContactSection></ContactSection>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ query }: Context) {
  const { [0]: data, [1]: meta } = await Promise.all([
    getIdeaBySlug(escape(query.slug)),
    getIdeaMeta(escape(query.slug)),
  ])
  const authors: AuthorLink[] = []

  if (data._embedded.author[0].name)
    authors.push({
      id: data._embedded.author[0].id,
      name: data._embedded.author[0].name,
    })

  if (!!data.acf || !!data.content) {
    const related = []
    if (!!data.acf) {
      for (const idea of data.acf.related_ideas) {
        const data2 = await getIdeaBySlug(idea.post_name)
        related.push(data2)
      }

      if (data.acf.co_author) {
        for (const auth of data.acf.co_author) {
          authors.push({
            id: auth.ID,
            name: auth.data.display_name,
          })
        }
      }
    }

    return {
      props: {
        data: {
          title: data.title.rendered || '',
          imageUrl: data.acf.idea_image || '',
          date: data.date || '',
          authors: authors || '',
          categories: data._embedded['wp:term'][0].map((category: { name: string }) => category.name) || [],
          content: data.content.rendered || '',
          slug: data.slug || '',
          descriptionText: data.acf.idea_description || '',
          tags:
            data._embedded['wp:term'][1].map((tag: { name: string; slug: string }) => {
              return { name: tag.name, slug: tag.slug }
            }) || [],
          readTime:
            data.content.rendered && Math.floor(data.content.rendered.split(' ').length / 275)
              ? Math.floor(data.content.rendered.split(' ').length / 275)
              : '1',
        },
        related: related.map((idea: PostAPI) => {
          return {
            title: idea.title.rendered || '',
            id: idea.id || '',
            date: idea.date || '',
            categories: data._embedded['wp:term'][0].map((category: { name: string }) => category.name) || [],
            slug: idea.slug || '',
            descriptionText: idea.acf.idea_description || '',
            image: idea.acf.idea_image || '',
          }
        }),
        meta: convertMetaAPItoMeta(meta, data._embedded),
      },
    }
  }

  return {
    props: {
      data: {
        title: '',
        imageUrl: '',
        date: '',
        authors: '',
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
    },
  }
  // Next.js v10
  /*return {
    notFound: true,
  }*/
}
