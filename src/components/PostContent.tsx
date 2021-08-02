import { useEffect, useState } from 'react'
import Link from 'next/link'
import mediumZoom from 'medium-zoom'
import { useRouter } from 'next/router'

import Button from './Button'

import { AuthorLink } from '../types/AuthorContent'
import { createMarkup } from '../services/textUtilities'
import PostPageContent from '../types/PostPageContent'
import Meta from '../types/Meta'

import styles from '../styles/PostContent.module.css'
const AccessTime = '/icons/access_time-24px.svg'
const Back = '/icons/Btn_Retour.svg'
const Twitter = '/icons/twitter.png'
const Linkedin = '/icons/linkedin.png'
const Facebook = '/icons/facebook.png'
const Placeholder = '/images/blog-post-placeholder.jpg'

interface Props {
  content: PostPageContent
  meta: Meta
}

function formatAuthor(author: AuthorLink) {
  return (
    <span key={author.id}>
      <Link href={`/author/${author.id}`} passHref={true}>
        <Button className="text-orange-500 underline">
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

function wrapImages(content: string) {
  return content.replace(/(?<=<img[^>]*class="[^"]*)"(?=[^>]*>)/, ' data-zoomable"')
}

function getTopOffset() {
  const floating = document.getElementsByClassName('header-1')[0]

  return floating && window.innerWidth >= 820 ? floating.clientHeight : 0
}

function PostContent({ content, meta }: Props) {
  const router = useRouter()
  const [location, setLocation] = useState('')

  const handleAnchorClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (e.target) {
      window.scroll({
        top:
          document.getElementsByName(e.target['href'].split('#')[1])[0].getBoundingClientRect().top -
          getTopOffset() +
          window.pageYOffset,
        behavior: 'smooth',
      })
    }
  }

  const setAnchorHandlers = () => {
    if (router.asPath.includes('#')) {
      window.scroll({
        top:
          document.getElementsByName(router.asPath.split('#')[1])[0].getBoundingClientRect().top -
          getTopOffset() +
          window.pageYOffset,
        behavior: 'smooth',
      })
    }

    const contentTag: HTMLElement = document.getElementById('ideaContent')

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
    mediumZoom('[data-zoomable]')

    return setAnchorHandlers()
  }, [setAnchorHandlers])

  return (
    <div className="md:mx-2">
      <div className="p-6 md:p-0">
        <div className="mb-4 w-fit">
          <Link href="/blog" passHref>
            <Button>
              <div className="flex flex-row items-center">
                <img className="mr-4" src={Back} alt="Retour" />
                <span className="text-orange-500 text-xs leading-normal font-semibold">Retour au blog</span>
              </div>
            </Button>
          </Link>
        </div>
        <p
          className="md:py-6 text-xl leading-normal mt-4 md:my-4 font-medium"
          dangerouslySetInnerHTML={createMarkup(content.title)}
        />
      </div>
      <div className="pb-4 bg-white shadow-md md:rounded-lg">
        <img
          className="object-center h-80 md:h-100 w-full object-cover md:rounded-t-lg"
          src={meta.featuredImage ? meta.featuredImage : Placeholder}
          alt={content.title}
        />
        <div className="px-4 md:px-8 text-xs leading-normal text-orange-500 font-semibold flex items-center justify-between py-4">
          <span className="flex items-center">
            <span className="pr-8">
              {content.date.slice(8, 10)} / {content.date.slice(5, 7)} / {content.date.slice(0, 4)}
            </span>
            <span className="flex items-center pr-8">
              <img src={AccessTime} alt="Temps de lecture" width={15} height={15} />
              &nbsp;{content.readTime} min.
            </span>
          </span>
          <div className="flex flex-row items-center">
            <Button
              href={`https://www.facebook.com/sharer/sharer.php?u=${location.split('#')[0]}`}
              className="w-6 h-6 mr-4 self-center shadow-sm hover:shadow-md bg-white hover:bg-gray-200 rounded-full transition-all duration-250 p-1"
            >
              <img src={Facebook} className="w-4 h-4" alt="Facebook" />
            </Button>
            <Button
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${location.split('#')[0]}`}
              className="w-6 h-6 mr-4 shadow-sm hover:shadow-md bg-white hover:bg-gray-200 rounded-full transition-all duration-250 p-1"
            >
              <img src={Linkedin} className="w-4 h-4" alt="LinkedIn" />
            </Button>
            <Button
              href={`https://twitter.com/intent/tweet?text=${location.split('#')[0]}`}
              className="w-6 h-6 shadow-sm hover:shadow-md bg-white hover:bg-gray-200 rounded-full transition-all duration-250 p-1"
            >
              <img src={Twitter} className="w-4 h-4" alt="Twitter" />
            </Button>
          </div>
        </div>
        <div className="px-4 md:px-8 text-xs leading-normal text-orange-500 font-semibold lg:flex lg:justify-between lg:items-center">
          {content.authors.length > 0 && <div className="py-4 text-black">{formatAuthorList(content.authors)}</div>}
          {content.tags.length > 0 && (
            <div className="md:my-0 flex flex-row flex-wrap py-4">
              {content.tags.map((tag) => (
                <span key={tag.name} className="text-xs leading-normal pr-4">
                  <Link href={`/tags/${tag.slug}`} passHref>
                    <Button className="text-orange-500">
                      <span>#{tag.name}</span>
                    </Button>
                  </Link>
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          id="ideaContent"
          dangerouslySetInnerHTML={createMarkup(wrapImages(content.content))}
          className={`${styles.content} px-4 md:px-8 leading-normal text-sm text-justify`}
        />
      </div>
    </div>
  )
}

export default PostContent
