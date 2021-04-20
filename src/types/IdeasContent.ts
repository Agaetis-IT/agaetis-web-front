import { PostAPI } from '../models/IdeasAPI'

export interface IdeasDesc {
  id: number
  slug: string
  title: string
  categories: string[]
  tags: Tag[]
  descriptionText: string
  date: string
  image?: string
}

export interface RelatedIdeas {
  ID: number
  category: number[]
  post_title: string
  post_excerpt: string
}

export interface Category {
  categoryId: number
  categoryName: string
}

export interface IdeasPageContent {
  titre: string
  description: string
  ideasimg1: string
  ideasimg2: string
  white_paper_description: string
}

export default interface IdeasContent {
  title: string
  date: string
  authors: string[]
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
