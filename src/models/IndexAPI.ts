export default interface IndexAPI {
  heroValues: string
  heroQuote: string
  heroSubtitle: string
  heroImage: string
  offersTitle: string
  offers: Offer[]
  sectorsTitle: string
  sectors: Sector[]
  convictionsTitle: string
  convictions: Conviction[]
  expertisesTitle: string
  expertises: Expertise[]
  expertisesImageDesktop: string
  expertisesImageMobile: string
  joinUs: JoinUs
}

export interface Offer {
  title: string
  shortDescription: string
  description: string
  image: string
  icon: string
  relatedLandingPage?: string
}

export interface Sector {
  title: string
  description: string
  image: string
}

export interface Conviction {
  title: string
  description: string
  image: string
}

export interface Expertise {
  logo: string
  title: string
  items: string
}

export interface JoinUs {
  desktopImage: string
  leftMobileImage: string
  rightMobileImage: string
  humanImage: string
  title: string
  description: string
  careerTitle: string
  careerDescription: string
}