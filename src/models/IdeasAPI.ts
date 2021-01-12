export interface PostAPI {
  title: { rendered: string }
  slug: string
  acf: {
    idea_image: string
    idea_description: string
  }
}
