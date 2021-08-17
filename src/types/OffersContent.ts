import LandingPageAPI from '../models/LandingPageAPI'

export interface OffersPageContent {
  title: string
  paragraph: string
  offers_description: string
  offers_image: string
  slug: string
}

export interface LandingPage {
  content: string
  title: string
}

export interface PostOffer {
  title: string
  slug: string
  image: string
  description: string
}

export function convertAPItoLandingPageContent(contentApi: LandingPageAPI) {
  return {
    content: contentApi.content ? contentApi.content.rendered : '',
    title: contentApi.title.rendered,
  }
}
