import React from 'react'

import IdeasContent from '../types/IdeasContent'

import './IdeaContent.css'
import AccessTime from '../static/icons/access_time-24px.svg'
import Back from '../static/icons/Btn_Retour.svg'
import Link from 'next/link'
import Button from './Button'
import { createMarkup } from '../Services/textUtilities'

import Twitter from '../static/icons/twitter.png'
import Linkedin from '../static/icons/linkedin.png'
import Facebook from '../static/icons/facebook.png'
import { useRouter } from 'next/router'

import './Common.css'

interface Props {
  content: IdeasContent
}

function IdeaContent({ content }: Props) {
  const router = useRouter()

  return (
    <div className="mx-1 md:mx-2">
      <div>
        <h1 className="text-orange text-2xl font-bold">Blog Agaetis</h1>
        <p
          className="py-6 text-xl leading-normal my-8 font-medium"
          dangerouslySetInnerHTML={createMarkup(content.title)}
        />
        <div className="my-4 sm:my-8">
          <Link href="/blog" passHref={true}>
            <Button>
              <div className="flex flex-row items-center mb-8">
                <img className="mr-4" src={Back} />
                <span className="text-orange text-xs font-semibold">Retour au blog</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mx-auto px-4 md:px-8 py-4 bg-white shadow-md">
        <div className="text-xs text-orange font-semibold flex items-center justify-between py-4">
          <span className="flex items-center">
            <span className="pr-8">
              {content.date.slice(8, 10)} / {content.date.slice(5, 7)} / {content.date.slice(0, 4)}
            </span>
            <div>
              {content.authors.map((element) => (
                <span key={element} className="pr-4">
                  <Link href={'#'} /*author page route*/ passHref={true}>
                    <Button className="text-orange">
                      <span>{element}</span>
                    </Button>
                  </Link>
                </span>
              ))}
            </div>
          </span>
          <div className="flex flex-row items-center">
            <Button
              href={`https://www.facebook.com/sharer/sharer.php?u=www.agaetis.fr${router.asPath}`}
              className="w-6 h-6 mr-4 self-center shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
            >
              <img src={Facebook} className="w-4 h-4" />
            </Button>
            <Button
              href={`https://www.linkedin.com/shareArticle?mini=true&url=www.agaetis.fr${router.asPath}`}
              className="w-6 h-6 mr-4 shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
            >
              <img src={Linkedin} className="w-4 h-4" />
            </Button>
            <Button
              href={`https://twitter.com/intent/tweet?text=www.agaetis.fr${router.asPath}`}
              className="w-6 h-6 shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
            >
              <img src={Twitter} className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-orange font-semibold flex items-center justify-between py-4">
          <span className="flex items-center">
            <span className="flex items-center pr-8">
              <img src={AccessTime} style={{ width: 15, height: 15 }} alt="read_time" />
              &nbsp;{content.readTime} min.
            </span>
            {content.tags.length > 0 && (
              <div className="my-4 md:my-0 flex flex-row flex-wrap">
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
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={createMarkup(content.content)}
          id="content"
          className="leading-normal text-sm text-justify"
        />

        <hr className="Footer-separator" />
      </div>
    </div>
  )
}

export default IdeaContent
