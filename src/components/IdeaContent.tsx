import { withRouter } from 'next/router'
import React from 'react'

import IdeasContent from '../types/IdeasContent'

interface Props {
  content: IdeasContent
}

function createMarkup(content: string) {
  return { __html: content }
}

function IdeaContent({ content }: Props) {
  // console.log(content)
  return (
    <div className="flex flex-row justify-center">
      <div className="md:max-w-md">
        <img className="mx-auto md:mx-0 shadow-xl m-4" src={content.imageUrl} alt={content.imageUrl} />
        <div className="text-xs font-semibold">
          <span>
            {content.date.slice(8, 10)}/{content.date.slice(5, 7)}/{content.date.slice(0, 4)}
          </span>
          <span>{content.author}</span>
        </div>
        <h2 dangerouslySetInnerHTML={createMarkup(content.title)} />
        <div dangerouslySetInnerHTML={createMarkup(content.content)} />
      </div>
    </div>
  )
}

export default withRouter(IdeaContent)
