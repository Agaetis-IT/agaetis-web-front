export interface IdeasDesc {
  id: number
  slug: string
  title: string
  category: string
  categories: string[]
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
}

export default interface IdeasContent {
  title: string
  date: string
  author: string
  content: string
  imageUrl: string
  category: string
  categories: string[]
  slug: string
}
