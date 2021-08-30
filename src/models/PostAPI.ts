export interface PostAPI {
  id: number
  title: { rendered: string }
  slug: string
  date: string
  acf: {
    description: string
    coAuthors: [{ data: { display_name: string } }]
  }
  _embedded: {
    'wp:featuredmedia': [
      {
        source_url: string
      }
    ]
    'wp:term': [
      [
        {
          name: string
        }
      ]
    ]
  }
}

export interface CategoryAPI {
  id: string
  name: string
  slug: string
}

export interface TagAPI {
  term_id: number
  name: string
  slug: string
}
