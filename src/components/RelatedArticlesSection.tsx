import React from 'react'
import { PostOffer } from '../types/OffersContent'
import Button from './Button'

interface Props {
  posts: PostOffer[]
  className?: string
}

export default function RelatedArticlesSection({ posts, className }: Props) {
  return (
    <div className={className}>
      <h2 className="text-orange">Nos articles associés</h2>
      <div className="mt-8 md:mt-16">
        {posts.map((post) => {
          return (
            <div className="flex flex-col md:flex-row h-auto md:h-32 lg:h-48 my-2" key={post.title}>
              <img src={post.image} className="w-full md:w-1/4"></img>
              <div className="flex flex-col p-4 lg:p-8 justify-between">
                <div>
                  <p dangerouslySetInnerHTML={{ __html: post.title }} className="pb-2 lg:pb-4"></p>
                  <p
                    dangerouslySetInnerHTML={{ __html: post.description }}
                    className="text-xs lg:text-sm leading-normal text-justify"
                  ></p>
                </div>
                <Button className="text-orange text-sm mt-4 md:m-0" href={`/${post.slug}`}>
                  <span>{'> Lire la suite de cet article'}</span>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
