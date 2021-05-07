import React, { useEffect, useState } from 'react'

import IdeasContent from '../types/IdeasContent'

import AccessTime from '../static/icons/access_time-24px.svg'
import Back from '../static/icons/Btn_Retour.svg'
import Link from 'next/link'
import Button from './Button'
import { createMarkup } from '../Services/textUtilities'

import Twitter from '../static/icons/twitter.png'
import Linkedin from '../static/icons/linkedin.png'
import Facebook from '../static/icons/facebook.png'
import { useRouter } from 'next/router'

import './IdeaContent.css'
import Placeholder from '../static/images/blog-post-placeholder.jpg'
import { AuthorLink } from '../types/AuthorContent'

interface Props {
  content: IdeasContent
}

function formatAuthor(author: AuthorLink) {
  return (
    <span key={author.id}>
      <Link href={`/author/${author.id}`} passHref={true}>
        <Button className="text-orange underline">
          <span>{author.name}</span>
        </Button>
      </Link>
    </span>
  )
}

function formatAuthorList(authors: AuthorLink[]) {
  return authors.map((author, i) => [
    i === 0 && 'Par ',
    i > 0 && i < authors.length - 1 && ', ',
    i === authors.length - 1 && authors.length > 1 && ' et ',
    formatAuthor(author),
  ])
}

function IdeaContent({ content }: Props) {
  const router = useRouter()
  const [location, setLocation] = useState('')

  const handleAnchorClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (e.target) {
      document
        .getElementsByName(e.target['href'].split('#')[1])[0]
        .scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }

  const setAnchorHandlers = () => {
    if (router.asPath.includes('#')) {
      document.getElementsByName(router.asPath.split('#')[1])[0].scrollIntoView({ block: 'center' })
    }

    const contentTag: HTMLElement | null = document.getElementById('content')

    if (contentTag) {
      for (const anchor of Array.from(contentTag.getElementsByTagName('a'))) {
        if (anchor.href.includes(router.asPath.split('#')[0] + '#')) {
          anchor.addEventListener('click', handleAnchorClick)
        }
      }

      return () => {
        for (const anchor of Array.from(contentTag.getElementsByTagName('a'))) {
          if (anchor.href.includes(router.asPath.split('#')[0] + '#')) {
            anchor.removeEventListener('click', handleAnchorClick)
          }
        }
      }
    }

    return undefined
  }

  useEffect(() => {
    setLocation(window.location.href)
    return setAnchorHandlers()
  }, [])

  return (
    <div className="md:mx-2">
      <div className="p-6 md:p-0">
        <h1 className="text-orange text-2xl font-bold">Blog Agaetis</h1>
        <p
          className="py-3 md:py-6 text-xl leading-normal my-8 font-medium"
          dangerouslySetInnerHTML={createMarkup(content.title)}
        />
        <div className="my-4 md:my-8">
          <Link href="/blog" passHref={true}>
            <Button>
              <div className="flex flex-row items-center">
                <img className="mr-4" src={Back} />
                <span className="text-orange text-xs font-semibold">Retour au blog</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="pb-4 bg-white shadow-md md:round8">
        <img
          src={content.imageUrl ? content.imageUrl : Placeholder}
          className="w-full h-80 md:h-128 md:round8top object-cover"
        />
        <div className="px-4 md:px-8 text-xs text-orange font-semibold flex items-center justify-between py-4">
          <span className="flex items-center">
            <span className="pr-8">
              {content.date.slice(8, 10)} / {content.date.slice(5, 7)} / {content.date.slice(0, 4)}
            </span>
            <span className="flex items-center pr-8">
              <img src={AccessTime} style={{ width: 15, height: 15 }} alt="read_time" />
              &nbsp;{content.readTime} min.
            </span>
          </span>
          <div className="flex flex-row items-center">
            <Button
              href={`https://www.facebook.com/sharer/sharer.php?u=${location.split('#')[0]}`}
              className="w-6 h-6 mr-4 self-center shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
            >
              <img src={Facebook} className="w-4 h-4" />
            </Button>
            <Button
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${location.split('#')[0]}`}
              className="w-6 h-6 mr-4 shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
            >
              <img src={Linkedin} className="w-4 h-4" />
            </Button>
            <Button
              href={`https://twitter.com/intent/tweet?text=${location.split('#')[0]}`}
              className="w-6 h-6 shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
            >
              <img src={Twitter} className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="px-4 md:px-8 text-xs text-orange font-semibold lg:flex lg:justify-between lg:items-center">
          {content.authors.length > 0 && <div className="py-4 text-black">{formatAuthorList(content.authors)}</div>}
          {content.tags.length > 0 && (
            <div className="md:my-0 flex flex-row flex-wrap py-4">
              {content.tags.map((tag) => (
                <span key={tag.name} className="text-xs pr-4">
                  <Link href={`/tags/${tag.slug}`} passHref={true}>
                    <Button className="text-orange">
                      <span>#{tag.name}</span>
                    </Button>
                  </Link>
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={createMarkup(content.content)}
          id="content"
          className="px-4 md:px-8 leading-normal text-sm text-justify"
        />

        <hr className="Footer-separator" />
      </div>
    </div>
  )
}

export default IdeaContent
