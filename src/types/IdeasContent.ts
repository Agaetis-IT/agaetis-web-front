export interface IdeasDesc {
  id: number
  slug: string
  title: string
  category: string
  descriptionText: string
  date: string
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
}

export default interface IdeasContent {
  title: string
  date: string
  author: string
  content: string
  imageUrl: string
  category: string
  related: RelatedIdeas[]
}
