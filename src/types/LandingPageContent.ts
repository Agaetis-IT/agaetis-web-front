import LandingPageAPI from '../models/LandingPageAPI'

export interface LandingPage {
  content: string
  title: string
}

export function convertAPItoLandingPageContent(contentApi: LandingPageAPI) {
  return {
    content: contentApi.content ? contentApi.content.rendered : '',
    title: contentApi.title.rendered,
  }
}
