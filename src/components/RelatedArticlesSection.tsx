import { useMemo } from 'react'
import Link from 'next/link'

import Button from './Button'
import PostCard from './PostCard'

import { PostOffer } from '../types/OffersContent'

import styles from '../styles/Common.module.css'

interface Props {
  posts: PostOffer[]
  className?: string
}

export default function RelatedArticlesSection({ posts, className }: Props) {
  const cards = useMemo(
    () =>
      posts.map((post) => (
        <div
          key={post.slug}
          className={`m-2 mb-8 shadow-md hover:shadow-lg ${styles.smoothTransition} ${styles.zoomIn} ${styles.round8} ${styles.wInherit}`}
        >
          <PostCard slug={post.slug} title={post.title} image={post.image} description={post.description} />
        </div>
      )),
    [posts]
  )

  return (
    <div className={className}>
      <h2 className="text-orange-500">Nos articles associés</h2>
      <div className="mt-8 md:mt-16 pb-8">
        {cards.length ? cards : 'Aucun résultat'}
      </div>
      <Link href="/blog">
        <Button className="uppercase rounded-full bg-orange-500 text-xss leading-normal py-2 px-6 text-white font-semibold mx-auto shadow-md">
          Consulter notre blog
        </Button>
      </Link>
    </div>
  )
}
