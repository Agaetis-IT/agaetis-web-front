/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { escape } from 'querystring'
import Head from 'next/head'

import Button from '../../components/Button'
import ContactForm from '../../components/ContactForm'
import ContactSection from '../../components/ContactSection'
import Error from '../_error'
import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import PostContent from '../../components/PostContent'

import { AuthorLink } from '../../types/AuthorContent'
import { fixWordPressString, formatPostAuthors } from '../../services/textUtilities'
import { getPostBySlug, getPostMeta, getPostsByPage } from '../../services/wordpressService'
import PostPageContent, { PostDesc } from '../../types/PostPageContent'
import Meta, { convertMetaAPItoMeta } from '../../types/Meta'
import { PostAPI } from '../../models/PostAPI'

const Particles = '/images/particles-3.svg'

interface Props {
  data: PostPageContent
  related?: PostDesc[]
  meta: Meta
  errorCode?: number
}

export default function BlogPost({ data, related, meta, errorCode }: Props) {
  const [isOpenedMoreIdeas, setIsOpenedMoreIdeas] = useState(false)

  function handleToggleMoreIdeas() {
    setIsOpenedMoreIdeas(!isOpenedMoreIdeas)
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  const relatedIdeas = useMemo(() => {
    if (related) {
      return related.map((idea) => (
        <div
          key={idea.id}
          className="m-2 mb-8 shadow-md hover:shadow-lg transition-all duration-250 transform hover:scale-102 rounded-lg"
        >
          <PostCard slug={idea.slug} title={idea.title} image={idea.image} description={idea.descriptionText} />
        </div>
      ))
    }
    return []
  }, [related])

  return (
    <>
      <Head>
        <title>Agaetis - {fixWordPressString(data.title)}</title>
        <meta property="og:title" content={`Agaetis - ${fixWordPressString(data.title)}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/blogpost/${data.slug}`} />
        <meta property="og:description" content={meta.description ? meta.description : data.descriptionText} />
        <meta
          property="og:image"
          content={meta.featuredImage || `${process.env.NEXT_PUBLIC_SITE_URL}/public${Particles}`}
        />
        <meta name="description" content={meta.description ? meta.description : data.descriptionText} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/blogpost/${data.slug}`} />
        <meta name="twitter:label1" content={`Auteur${data.authors.length > 1 ? 's' : ''}`} />
        <meta name="twitter:data1" content={`${formatPostAuthors(data.authors.map((author) => author.name))}`} />
        <meta name="twitter:label2" content="Temps de lecture" />
        <meta name="twitter:data2" content={`${data.readTime} min.`} />
      </Head>
      <Layout displayedPage={'/blog'}>
        <div className="pt-0 md:pt-17">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundPosition: 'top',
              backgroundSize: '100% auto',
              backgroundRepeat: 'no-repeat',
            }}
            className="py-4 md:p-16 lg:px-32 xl:px-48 bg-gray-400"
          >
            <PostContent content={data} meta={meta} />
            {related && related.length > 0 && (
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
                    'flex-row justify-center uppercase rounded-full bg-orange-500 hover:bg-orange-400 text-xss leading-normal py-2 px-6 mt-8 text-white font-semibold mx-auto shadow-md hover:shadow-lg transition-all duration-250'
                  )}
                >
                  {!isOpenedMoreIdeas ? 'Voir plus' : 'Voir moins'}
                </Button>
              </div>
            )}
          </div>
          <ContactForm title="Un sujet vous intéresse ? Une question ? Contactez-nous !" />
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const posts = await getPostsByPage()

  return {
    paths: posts.data.map((post: PostAPI) => ({
      params: {
        postSlug: post.slug,
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    const { [0]: data, [1]: meta } = await Promise.all([
      getPostBySlug(escape(params.postSlug)),
      getPostMeta(escape(params.postSlug)),
    ])

    if (data !== '{"errorCode":404}') {
      const authors: AuthorLink[] = []
      if (data._embedded.author[0].name) {
        authors.push({
          id: data._embedded.author[0].id,
          name: data._embedded.author[0].name,
        })
      }

      if (data.acf || data.content) {
        const related = []
        if (data.acf) {
          for (const idea of data.acf.related_ideas) {
            const data2 = await getPostBySlug(idea.post_name)
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
              authors: authors || [],
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
                image:
                  (idea._embedded['wp:featuredmedia'] &&
                    idea._embedded['wp:featuredmedia'][0] &&
                    idea._embedded['wp:featuredmedia'][0].source_url) ||
                  '',
              }
            }),
            meta: convertMetaAPItoMeta(meta, data._embedded),
          },
          revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
        }
      }
    }

    return {
      notFound: true,
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  } catch (error) {
    return {
      props: {
        errorCode: 500,
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  }
}
