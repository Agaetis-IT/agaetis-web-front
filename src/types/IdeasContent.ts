export interface IdeasDesc {
  id: number
  slug: string
  title: string
  category: string
  descriptionText: string
  date: string
}

export interface Category {
  categoryId: number
  categoryName: string
}

export default interface IdeasContent {
  title: string
  date: string
  author: string
  content: string
  imageUrl: string
  category: string
}
