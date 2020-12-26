import { PostAPI } from './IdeasContent'

export default interface OffersContent {
  title: string
  paragraph: string
  slug: string
}

export interface OffersPageContent {
  title: string
  paragraph: string
  offers_description: string
  offers_image: string
  slug: string
}

interface OfferAPI {
  title: { rendered: string }
  acf: {
    title: string
    description: string
    offers_image1: string
  }
}

export interface OfferDesc {
  title: string
  offers_description: string
  offers_image1: string
  offers_image2: string
  slug: string
  childrens: OfferLeaf[]
}

export interface OfferContent {
  title: string
  paragraph: string
  slug: string
  offers_image1: string
  childrens: OfferLeaf[]
}

export interface OfferLeaf {
  post_title: string
  slug: string
}

interface LandingPageAPI {
  content: { rendered: string }
  title: { rendered: string }
}

export interface LandingPage {
  content: string
  title: string
}

export interface OfferLeafContent {
  title: string
  description: string
  posts: PostOffer[]
}

export interface PostOffer {
  title: string
  slug: string
  image: string
  description: string
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
    title: contentApi.title.rendered,
  }
}

export function convertAPItoOfferleaf(contentApi: OfferAPI, posts: PostAPI[]) {
  return {
    title: contentApi.title.rendered,
    ...contentApi.acf,
    posts: posts.map((post) => {
      return {
        title: post.title.rendered,
        slug: post.slug,
        image: post.acf.idea_image,
        description: post.acf.idea_description,
      }
    }),
  }
}
