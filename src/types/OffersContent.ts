export default interface OffersPageContent {
  title: string
  paragraph: string
  offers_description: string
  offers_image: string
}

export interface OffersContent {
  title: string
  paragraph: string
}

export interface OfferDesc {
  title: string
  offers_description: string
  offers_image: string
}

export function convertAPItoOffersContent(contentApi: OffersPageContent) {
  return {
    title: contentApi.title,
    paragraph: contentApi.paragraph,
  }
}
