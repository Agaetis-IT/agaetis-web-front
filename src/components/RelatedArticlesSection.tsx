import clsx from 'clsx'
import Link from 'next/link'
import { PostOffer } from '../types/OffersContent'
import Button from './Button'

interface Props {
  posts: PostOffer[]
  className?: string
}

export default function RelatedArticlesSection({ posts, className }: Props) {
  return (
    <div className={className}>
      <h2 className="text-orange-500">Nos articles associés</h2>
      <div className="mt-8 md:mt-16 pb-8">
        {posts.map((post, index) => {
          return (
            <div
              className={clsx('flex flex-col md:flex-row h-auto md:h-32 lg:h-48 my-2', {
                'mb-0': index === posts.length - 1,
              })}
              key={post.title}
            >
              <img src={post.image} className="w-full md:w-1/4" alt={post.title} />
              <div className="flex flex-col p-4 lg:p-8 justify-between">
                <div>
                  <p dangerouslySetInnerHTML={{ __html: post.title }} className="pb-2 lg:pb-4" />
                  <p
                    dangerouslySetInnerHTML={{ __html: post.description }}
                    className="text-xs lg:text-sm leading-normal text-justify"
                  />
                </div>

                <Link href={`/${post.slug}`}>
                  <Button className="text-orange-500 text-sm leading-normal mt-4 md:m-0" href={`/${post.slug}`}>
                    <span>{'> Lire la suite de cet article'}</span>
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      <Link href="/blog">
        <Button className="bg-white text-orange-500 rounded-full text-xs sm:text-sm leading-normal font-semibold px-4 sm:px-12 py-2 sm:py-3 shadow-md h-12 w-64 flex flex-col justify-center mx-auto">
          Consulter notre blog
        </Button>
      </Link>
    </div>
  )
}
