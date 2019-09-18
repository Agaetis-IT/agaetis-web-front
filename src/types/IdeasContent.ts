export interface IdeasDesc {
  id: number
  slug: string
  title: string
  categoriesId: number[]
  descriptionText: string
  date: string
}

export interface Category {
  categoryId: number
  categoryName: string
}
