import React from 'react'

import IdeasContent from '../types/IdeasContent'

import './IdeaContent.css'
import AccessTime from '../static/icons/access_time-24px.svg'
import Link from 'next/link'

interface Props {
  content: IdeasContent
}

function createMarkup(content: string) {
  return { __html: content }
}

function IdeaContent({ content }: Props) {
  return (
    <div className="mb-8">
      <>
        <div className="mx-auto px-0">
          <div className=" p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
            <div className="md:max-w-md mx-auto px-4 md:px-8 mt-0 md:mt-20">
              <div className="text-xs mb-12">
                <span>
                  <Link href="/">
                    <a className="text-underline text-black">Accueil</a>
                  </Link>

                  {' > '}
                  <Link href="/ideas">
                    <a className="text-underline text-black">Idées</a>
                  </Link>
                  {' > '}
                  <b dangerouslySetInnerHTML={createMarkup(content.title)} />
                </span>
              </div>
              <div className="text-xs font-semibold my-4 sm:my-8 ">
                <div className="flex items-center justify-between">
                  <span>
                    <span className="pr-1">
                      {content.date.slice(8, 10)}/{content.date.slice(5, 7)}/{content.date.slice(0, 4)}
                    </span>
                    <span className="text-blue">| {content.author}</span>
                  </span>
                  <span className="flex items-center">
                    <img src={AccessTime} style={{ width: 15, height: 15 }} alt="read_time" />
                    &nbsp;{content.readTime} min.
                  </span>
                </div>
              </div>
              <h1
                className="text-center text-3xl py-8 md:pb-0 "
                dangerouslySetInnerHTML={createMarkup(content.title)}
              ></h1>
              <div className="my-4 md:my-0 flex flex-row flex-wrap">
                {content.tags &&
                  content.tags.map((tag) => (
                    <span key={tag.name} className="tag text-xs ">
                      <Link href={`/tags/${tag.slug}`}>
                        <a className="text-white">{tag.name}</a>
                      </Link>
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:max-w-lg mx-auto px-4 md:px-8">
          <div className="md:px-4">
            <div
              dangerouslySetInnerHTML={createMarkup(content.content)}
              id="content"
              className=" text-sm py-4 text-justify"
            />
          </div>
          <hr className="Footer-separator" />
        </div>
      </>
    </div>
  )
}

export default IdeaContent
