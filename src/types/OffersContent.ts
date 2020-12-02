export default interface OffersPageContent {
  title: string
  paragraph: string
  offers_description: string
  offers_image: string
  slug: string
}

export interface OffersContent {
  title: string
  paragraph: string
  slug: string
}

export interface OfferDesc {
  title: string
  offers_description: string
  offers_image: string
  slug: string
}

interface LandingPageAPI {
  content: { rendered: string }
}

export interface LandingPage {
  content: string
}

export function convertAPItoOffersContent(contentApi: OffersPageContent) {
  return {
    title: contentApi.title,
    paragraph: contentApi.paragraph,
    slug: contentApi.slug,
  }
}

export function convertAPItoLandingPageContent(contentApi: LandingPageAPI) {
  return {
    content: contentApi.content ? contentApi.content.rendered : '',
  }
}
