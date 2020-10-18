import './IdeaContent.css'

import React, { useState } from 'react'

import Button from './Button'
import IdeasContent from '../types/IdeasContent'
import Linkedin from '../public/icons/linkedin.png'
import Twitter from '../public/icons/twitter.png'
import clsx from 'clsx'

interface Props {
  content: IdeasContent
}

function createMarkup(content: string) {
  return { __html: content }
}

function getMedia(url: string) {
  if (url.includes('twitter')) {
    return Twitter
  } else if (url.includes('linkedin')) {
    return Linkedin
  }
  return ''
}

function IdeaContent({ content }: Props) {
  const [classname, setClassname] = useState<string | undefined>(undefined)
  const toggleInfo = () => {
    if (!classname || classname === 'close') {
      setClassname('open')
    } else {
      setClassname('close')
    }
  }
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
                Blog
              </a>
              {' > '}
              <b dangerouslySetInnerHTML={createMarkup(content.title)} />
            </span>
          </div>
          <div className="text-xs font-semibold my-4 sm:my-8 relative">
            <div>
              <span className="pr-1">
                {content.date.slice(8, 10)}/{content.date.slice(5, 7)}/{content.date.slice(0, 4)} |
              </span>
              <span className="text-blue cursor-pointer" onClick={toggleInfo}>
                {content.author}
              </span>
              <span
                className={clsx(
                  'inline mx-4 ',
                  content.authorUrl && classname ? `author-popper-${classname} block` : 'hidden'
                )}
              >
                {content.authorUrl.split(',').map((url) => (
                  <Button href={url} key={url} className="mr-4 author-media inline-block">
                    <img className="" src={getMedia(url)} alt="facebook" />
                  </Button>
                ))}
              </span>
            </div>
          </div>

          <h1 className="font-semibold mb-8" dangerouslySetInnerHTML={createMarkup(content.title)} />
          <div className="my-4 md:my-0 flex flex-row flex-wrap">
            {content.tags &&
              content.tags.map((tag) => (
                <span key={tag.name} className="tag text-xs ">
                  <a href={`/tags/${tag.slug}`} className="text-white">
                    {tag.name}
                  </a>
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
