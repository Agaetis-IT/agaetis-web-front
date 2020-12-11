export interface OffersPageContent {
  title: string
  paragraph: string
  offers_description: string
  offers_image: string
  slug: string
}

export default interface OffersContent {
  title: string
  paragraph: string
  slug: string
}

export interface OfferDesc {
  title: string
  offers_description: string
  offers_image1: string
  offers_image2: string
  slug: string
}

interface LandingPageAPI {
  content: { rendered: string }
}

export interface LandingPage {
  content: string
}

export function convertAPItoOffersContent(contentApi: OffersPageContent): OffersContent {
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
