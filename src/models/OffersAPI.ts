export default interface OffersAPI {
  acf: {
    title: string
    offers_description: string
    short_desc: string
    image: string
    related_landingpage?: string
  }
  title: { rendered: string }
  slug: string
}
