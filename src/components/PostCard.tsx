import Link from 'next/link'

import { createMarkup } from '../services/textUtilities'

import styles from '../styles/PostCard.module.css'
import commonStyles from '../styles/Common.module.css'
const Placeholder = '/images/blog-post-placeholder.jpg'

interface Props {
  title: string
  slug: string
  description: string
  image?: string
}

export default function PostCard({ slug, title, image, description }: Props) {
  return (
    <Link href={`/blogpost/${slug}`}>
      <a className="text-black">
        <div className={`bg-white sm:flex ${commonStyles.round8}`}>
          <img className={`object-cover object-center w-full sm:w-3/10 h-56 ${styles.round8top} ${styles['sm:round8left']}`} src={image ? image : Placeholder} alt={title} />
          <div className="py-6 px-8 h-56 w-full sm:w-7/10">
            <div className="h-1/3">
              <h3
                dangerouslySetInnerHTML={createMarkup(title)}
                className="font-semibold text-xs md:text-base leading-normal"
              />
            </div>
            <div className="h-1/2">
              <div className={`h-full overflow-hidden relative ${styles.fade}`}>
                <p className="text-xs text-justify leading-normal">{description}</p>
              </div>
            </div>
            <div className="h-1/6 text-orange-500 text-xs leading-normal font-semibold">
              <p className="mt-4">
                {'>'} <u>Lire l'article</u>
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
