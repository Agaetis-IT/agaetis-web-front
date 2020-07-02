import React from 'react'

import IdeasContent from '../types/IdeasContent'

import './IdeaContent.css'

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
          <div className="text-xs mb-12">
            <span>
              <a className="text-underline text-black" href="/">
                Accueil
              </a>
              {' > '}
              <a className="text-underline text-black" href="/ideas">
                Idées
              </a>
              {' > '}
              <b dangerouslySetInnerHTML={createMarkup(content.title)} />
            </span>
          </div>
          <div className="text-xs font-semibold my-4 sm:my-8 ">
            <div>
              <span className="pr-1">
                {content.date.slice(8, 10)}/{content.date.slice(5, 7)}/{content.date.slice(0, 4)}
              </span>
              <span className="text-blue">| {content.author}</span>
            </div>
          </div>
          <h2 className="font-semibold mb-8" dangerouslySetInnerHTML={createMarkup(content.title)} />
          <div className="my-4 md:my-0 flex flex-row flex-wrap md:inline-block">
            {content.tags &&
              content.tags.map((tag) => (
                <span key={tag} className="tag my-2 text-xs">
                  {tag}
                </span>
              ))}
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
