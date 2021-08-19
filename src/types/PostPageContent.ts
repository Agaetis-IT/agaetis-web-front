import { PostAPI } from '../models/PostAPI'
import { AuthorLink } from '../models/AuthorAPI'

export interface PostCardContent {
  id: number
  slug: string
  title: string
  categories: string[]
  descriptionText: string
  date: string
  image?: string
}

export function convertPostAPIToCardContent(post: PostAPI) {
  return {
    id: post.id || '',
    title: post.title.rendered || '',
    categories: post._embedded['wp:term'][0].map((category: { name: string }) => category.name) || [],
    slug: post.slug || '',
    descriptionText: post.acf.description || '',
    date: post.date || '',
    image:
      (post._embedded['wp:featuredmedia'] &&
        post._embedded['wp:featuredmedia'][0] &&
        post._embedded['wp:featuredmedia'][0].source_url) ||
      '',
  }
}

export interface Category {
  categoryId: number
  categoryName: string
}

export interface Tag {
  name: string
  slug: string
}

export interface Response {
  data: PostAPI[]
  pageCount: number
}

export default interface PostPageContent {
  title: string
  date: string
  authors: AuthorLink[]
  content: string
  imageUrl: string
  categories: string[]
  tags: Tag[]
  slug: string
  descriptionText: string
  readTime: number
}
