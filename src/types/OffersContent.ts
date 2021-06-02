import { PostAPI } from '../models/IdeasAPI'
import OfferAPI from '../models/OfferAPI'

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

export interface OfferDesc {
  title: string
  offers_description: string
  offers_image1: string
  offers_image2: string
  short_desc: string
  image: string
  slug: string
  childrens: OfferLeaf[]
  related_landingpage?: string
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
  post_name: string
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
  slug: string
  title: string
  description: string
  posts: PostOffer[]
  partners: string[]
}

export interface PostOffer {
  title: string
  slug: string
  image: string
  description: string
}

export function compareOffer(a: OfferDesc, b: OfferDesc) {
  return a.title < b.title ? -1 : 1
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

function createPartnerArray(content: OfferAPI, keys: string[]) {
  const partners: string[] = []
  keys.forEach((key) => {
    if (key.includes(`partner`)) {
      partners.push(content.acf[key])
    }
  })
  return partners
}

export function convertAPItoOfferleaf(contentApi: OfferAPI, posts: PostAPI[]) {
  return {
    ...contentApi.acf,
    title: contentApi.acf.title ? contentApi.acf.title : contentApi.title.rendered,
    slug: contentApi.slug,

    partners: createPartnerArray(contentApi, Object.keys(contentApi.acf)),
    posts: posts.map((post) => {
      return {
        title: post.title.rendered,
        slug: post.slug,
        image: (post._embedded['wp:featuredmedia'] &&
        post._embedded['wp:featuredmedia'][0] &&
        post._embedded['wp:featuredmedia'][0].source_url) ||
      '',
        description: post.acf.idea_description,
      }
    }),
  }
}
