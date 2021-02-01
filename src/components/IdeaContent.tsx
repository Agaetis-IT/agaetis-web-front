import React from 'react'

import IdeasContent from '../types/IdeasContent'

import './IdeaContent.css'
import AccessTime from '../static/icons/access_time-24px.svg'
import Back from '../static/icons/Btn_Retour.svg'
import Link from 'next/link'
import Button from './Button'

interface Props {
  content: IdeasContent
}

function createMarkup(content: string) {
  return { __html: content }
}

function IdeaContent({ content }: Props) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 md:px-8 mt-0">
        <h1 className="text-orange text-3xl">Blog Agaetis</h1>
        <h1 className="text-3xl py-8 md:pb-0 " dangerouslySetInnerHTML={createMarkup(content.title)}></h1>
        <div className="text-xs font-semibold my-4 sm:my-8 ">
          <div className="flex items-center justify-between">
            <span>
              <span className="pr-1">
                {content.date.slice(8, 10)}/{content.date.slice(5, 7)}/{content.date.slice(0, 4)}
              </span>
              <span className="text-blue">
                | {`${content.author}`} {content.coAuthor && ` & ${content.coAuthor}`}
              </span>
            </span>
            <span className="flex items-center">
              <img src={AccessTime} style={{ width: 15, height: 15 }} alt="read_time" />
              &nbsp;{content.readTime} min.
            </span>
          </div>
          <Link href="/blog">
            <Button>
              <div className="flex flex-row items-center mt-8">
                <img className="mr-4" src={Back} />
                <span className="text-orange">Retour au blog</span>
              </div>
            </Button>
          </Link>
        </div>
        {content.tags.length > 0 && (
          <div className="my-4 md:my-0 flex flex-row flex-wrap">
            {content.tags.map((tag) => (
              <span key={tag.name} className="tag text-xs ">
                <Link href={`/tags/${tag.slug}`}>
                  <a className="text-white">{tag.name}</a>
                </Link>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className=" mx-auto px-4 md:px-8">
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
