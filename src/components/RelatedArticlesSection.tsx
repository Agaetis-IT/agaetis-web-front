import React from 'react'
import { PostOffer } from '../types/OffersContent'

interface Props {
  posts: PostOffer[]
  className?: string
}

export default function RelatedArticlesSection({ posts, className }: Props) {
  return (
    <div className={className}>
      <h2 className="text-orange">Nos articles associés</h2>
      <div className="mt-16">
        {posts.map((post) => {
          console.log(post)
          return (
            <div className="flex flex-row h-32 lg:h-48 bg-light-grey my-2" key={post.title}>
              <img src={post.image} className="w-1/4"></img>
              <div className="flex flex-col p-8">
                <p dangerouslySetInnerHTML={{ __html: post.title }}></p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
