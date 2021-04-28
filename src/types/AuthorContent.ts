export interface AuthorPageContent {
  titre: string
  posts_description: string
}

export interface AuthorAPI {
  id: number
  name: string
  url: string
  description: string
  slug: string
  avatar_urls: {
    '24': string
    '48': string
    '96': string
  }
}

export interface AuthorDescription {
  id: number
  slug: string
  name: string
  descriptionText: string
  avatar?: string
  linkedInLink?: string
}
