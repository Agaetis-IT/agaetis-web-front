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
    <div className="flex flex-row justify-center mb-8">
      <div className="md:max-w-md px-4 md:px-8">
        <div className="text-xs">
          <span className="text-underline">Accueil</span> > <span className="text-underline">Idées</span> >{' '}
          <b>Idée #1</b>
        </div>
        <img className="mx-auto md:mx-0 shadow-xl m-4" src={content.imageUrl} alt={content.imageUrl} />
        <div className="px-4">
          <div className="text-xs font-semibold mb-4">
            <span className="pr-1">
              {content.date.slice(8, 10)}/{content.date.slice(5, 7)}/{content.date.slice(0, 4)}
            </span>
            <span className="text-blue">| {content.author}</span>
          </div>
          <h2 className="font-semibold" dangerouslySetInnerHTML={createMarkup(content.title)} />
          <div dangerouslySetInnerHTML={createMarkup(content.content)} className="content text-xs py-4 text-justify" />
        </div>
        <hr className="Footer-separator" />
      </div>
    </div>
  )
}

export default IdeaContent
