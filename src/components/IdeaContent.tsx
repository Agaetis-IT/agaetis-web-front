import React from 'react'

import IdeasContent from '../types/IdeasContent'

import './IdeaContent.css'
import clsx from 'clsx'

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
        <div className="md:max-w-md mx-auto px-4 md:px-8">
          <div className="text-xs">
            <span>
              <a className="text-underline text-black" href="/">
                Accueil
              </a>{' '}
              >{' '}
              <a className="text-underline text-black" href="/ideas">
                Idées
              </a>{' '}
              > <b dangerouslySetInnerHTML={createMarkup(content.title)} />
            </span>
          </div>
          <img
            className={clsx('mx-auto md:mx-0  m-4', { 'shadow-xl': content.imageUrl })}
            src={content.imageUrl}
            alt={content.imageUrl}
          />
          <div className="text-xs font-semibold mb-4">
            <span className="pr-1">
              {content.date.slice(8, 10)}/{content.date.slice(5, 7)}/{content.date.slice(0, 4)}
            </span>
            <span className="text-blue">| {content.author}</span>
          </div>
          <h2 className="font-semibold" dangerouslySetInnerHTML={createMarkup(content.title)} />
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
