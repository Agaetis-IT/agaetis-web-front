export interface AuthorPageContent {
  titre: string
  posts_description: string
}

export interface AuthorLink {
  id: number
  name: string
}

export interface AuthorAPI {
  id: number
  name: string
  url: string
  description: string
  avatar_urls: {
    '96': string
  }
}

export interface AuthorDescription {
  id: number
  name: string
  descriptionText: string
  avatar?: string
  linkedInLink?: string
}
