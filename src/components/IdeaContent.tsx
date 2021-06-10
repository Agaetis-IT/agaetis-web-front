import { useEffect, useState } from 'react'
import Image from 'next/image'
import IdeasContent from '../types/IdeasContent'

const AccessTime = '/icons/access_time-24px.svg'
const Back = '/icons/Btn_Retour.svg'
import Link from 'next/link'
import Button from './Button'
import { createMarkup } from '../services/textUtilities'

const Twitter = '/icons/twitter.png'
const Linkedin = '/icons/linkedin.png'
const Facebook = '/icons/facebook.png'
import { useRouter } from 'next/router'

import styles from '../styles/IdeaContent.module.css'
import commonStyles from '../styles/Common.module.css'

const Placeholder = '/images/blog-post-placeholder.jpg'
import { AuthorLink } from '../types/AuthorContent'
import Meta from '../types/Meta'

interface Props {
  content: IdeasContent
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

function getTopOffset() {
  const floating = document.getElementsByClassName('header-2')[0]

  return floating && !floating.classList.contains('hidden') && window.innerWidth >= 820 ? floating.clientHeight : 0
}

function IdeaContent({ content, meta }: Props) {
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
    return setAnchorHandlers()
  }, [setAnchorHandlers])

  return (
    <div className="md:mx-2">
      <div className="p-6 md:p-0">
        <h1 className="text-orange-500 text-2xl leading-normal font-bold">Blog Agaetis</h1>
        <p
          className="py-3 md:py-6 text-xl leading-normal my-8 font-medium"
          dangerouslySetInnerHTML={createMarkup(content.title)}
        />
        <div className="my-4 md:my-8">
          <Link href="/blog" passHref={true}>
            <Button>
              <div className="flex flex-row items-center">
                <div className="mr-4 text-none"><Image src={Back} width={52} height={52} layout="fixed" quality={100}/></div>
                <span className="text-orange-500 text-xs leading-normal font-semibold">Retour au blog</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className={`pb-4 bg-white shadow-md ${styles['md:round8']}`}>
        <div className={`relative h-80 md:h-128 w-full object-cover ${styles['md:round8top']}`}>
          <Image
            src={meta.featuredImage ? meta.featuredImage : Placeholder}
            className={styles['md:round8top']}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="px-4 md:px-8 text-xs leading-normal text-orange-500 font-semibold flex items-center justify-between py-4">
          <span className="flex items-center">
            <span className="pr-8">
              {content.date.slice(8, 10)} / {content.date.slice(5, 7)} / {content.date.slice(0, 4)}
            </span>
            <span className="flex items-center pr-8">
              <Image src={AccessTime} width={15} height={15} alt="read_time" layout="fixed" quality={100}/>
              &nbsp;{content.readTime} min.
            </span>
          </span>
          <div className="flex flex-row items-center">
            <Button
              href={`https://www.facebook.com/sharer/sharer.php?u=${location.split('#')[0]}`}
              className={`w-6 h-6 mr-4 self-center shadow-sm hover:shadow-md bg-white rounded-full ${commonStyles.smoothTransition} p-1`}
            >
              <Image src={Facebook} className="w-4 h-4" width={24} height={24} quality={100}/>
            </Button>
            <Button
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${location.split('#')[0]}`}
              className={`w-6 h-6 mr-4 shadow-sm hover:shadow-md bg-white rounded-full ${commonStyles.smoothTransition} p-1`}
            >
            <Image src={Linkedin} className="w-4 h-4" width={24} height={24} quality={100}/>
            </Button>
            <Button
              href={`https://twitter.com/intent/tweet?text=${location.split('#')[0]}`}
              className={`w-6 h-6 shadow-sm hover:shadow-md bg-white rounded-full ${commonStyles.smoothTransition} p-1`}
            >
            <Image src={Twitter} className="w-4 h-4" width={24} height={24} quality={100}/>
            </Button>
          </div>
        </div>
        <div className="px-4 md:px-8 text-xs leading-normal text-orange-500 font-semibold lg:flex lg:justify-between lg:items-center">
          {content.authors.length > 0 && <div className="py-4 text-black">{formatAuthorList(content.authors)}</div>}
          {content.tags.length > 0 && (
            <div className="md:my-0 flex flex-row flex-wrap py-4">
              {content.tags.map((tag) => (
                <span key={tag.name} className="text-xs leading-normal pr-4">
                  <Link href={`/tags/${tag.slug}`} passHref={true}>
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
          dangerouslySetInnerHTML={createMarkup(content.content)}
          className={`${styles.content} px-4 md:px-8 leading-normal text-sm text-justify`}
        />
      </div>
    </div>
  )
}

export default IdeaContent
