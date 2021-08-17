import { PostAPI } from '../models/PostAPI'
import { AuthorLink } from '../models/AuthorAPI'

export interface PostDesc {
  id: number
  slug: string
  title: string
  categories: string[]
  tags: Tag[]
  descriptionText: string
  date: string
  image?: string
}

export interface RelatedPost {
  ID: number
  category: number[]
  post_title: string
  post_excerpt: string
}

export interface Category {
  categoryId: number
  categoryName: string
}

export default interface PostPageContent {
  title: string
  date: string
  authors: AuthorLink[]
  content: string
  imageUrl: string
  category: string
  categories: string[]
  tags: Tag[]
  slug: string
  descriptionText: string
  readTime: number
}

export interface Tag {
  name: string
  slug: string
}

export interface Response {
  data: PostAPI[]
  pageCount: number
}
