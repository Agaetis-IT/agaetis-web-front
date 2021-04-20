export interface PostAPI {
  id: number
  title: { rendered: string }
  slug: string
  date: string
  acf: {
    idea_image: string
    idea_description: string
    coAuthor: [{ data: { display_name: string } }]
  }
  _embedded: {
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
