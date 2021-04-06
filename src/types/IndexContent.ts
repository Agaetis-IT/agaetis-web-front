/* eslint-disable @typescript-eslint/camelcase */

import IndexContentAPI from '../models/IndexAPI'

export default interface IndexContent {
  hero_valeurs: string
  hero_subtitle: string
  hero_image: string
  offres_title: string
  offres: OfferDesc[]
  secteurs_title: string
  secteurs: SectorDesc[]
  convictions_title: string
  convictions: Conviction[]
  expertises_title: string
  expertises_image_desktop: string
  expertises_image_mobile: string
  expertises: Expertise[]
  joinus_carreer_desc: string
  joinUs_image_desktop: string
  joinUs_image_mobile_1: string
  joinUs_image_mobile_2: string
  joinUs_human: string
  joinUs_agaetis_title: string
  joinUs_agaetis_desc: string
  joinUs_carreer_title: string
  joinUs_carreer_desc: string
}

export interface OfferDesc {
  index: number
  title: string
  short_desc: string
  desc: string
  image: string
  related_offers: string[]
}

export interface SectorDesc {
  index: number
  title: string
  desc: string
  image: string
}

export interface Conviction {
  index: number
  title: string
  desc: string
  image: string
}

export interface Expertise {
  index: number
  title: string
  items: string
  logo: string
}

function createOfferArray(contentApi: IndexContentAPI, keys: string[]) {
  const offers: OfferDesc[] = []
  keys.forEach((key) => {
    const offerIndex = offers.findIndex((offer) => offer.index === parseInt(key[11], 10))
    if (!Number.isNaN(parseInt(key[11], 10))) {
      if (offerIndex === -1) {
        const newOffer = Object.create({ index: 0, title: '', short_desc: '', desc: '', image: '' })
        newOffer.index = parseInt(key[11], 10)
        offers.push(newOffer)
      }
      const newindex = offers.findIndex((offer) => offer.index === parseInt(key[11], 10))
      if (key.includes('title')) {
        offers[newindex].title = contentApi[key]
      }
      if (key.includes('short_desc')) {
        offers[newindex].short_desc = contentApi[key]
      }
      if (key.includes('desc') && !key.includes('short_desc')) {
        offers[newindex].desc = contentApi[key]
      }
      if (key.includes('image')) {
        offers[newindex].image = contentApi[key]
      }
      if (key.includes('related_offers')) {
        offers[newindex].related_offers = contentApi[key].split(',')
      }
    }
  })
  return offers
}

function createSectorArray(contentApi: IndexContentAPI, keys: string[]) {
  const sectors: SectorDesc[] = []
  keys.forEach((key) => {
    const sectorIndex = sectors.findIndex((sector) => sector.index === parseInt(key.slice(8, 10), 10))
    if (!Number.isNaN(parseInt(key.slice(8, 10), 10))) {
      if (sectorIndex === -1) {
        const newSector = Object.create({ index: 0, title: '', desc: '', image: '' })
        newSector.index = parseInt(key.slice(8, 10), 10)
        sectors.push(newSector)
      }
      const newindex = sectors.findIndex((sector) => sector.index === parseInt(key.slice(8, 10), 10))
      if (key.includes('title')) {
        sectors[newindex].title = contentApi[key]
      }
      if (key.includes('desc')) {
        sectors[newindex].desc = contentApi[key]
      }
      if (key.includes('image')) {
        sectors[newindex].image = contentApi[key]
      }
    }
  })
  return sectors
}

function createConvictionArray(contentApi: IndexContentAPI, keys: string[]) {
  const convictions: Conviction[] = []
  keys.forEach((key) => {
    const convictionIndex = convictions.findIndex((conviction) => conviction.index === parseInt(key[11], 10))
    if (!Number.isNaN(parseInt(key[11], 10))) {
      if (convictionIndex === -1) {
        const newConviction = Object.create({ index: 0, title: '', desc: '', image: '' })
        newConviction.index = parseInt(key[11], 10)
        convictions.push(newConviction)
      }
      const newindex = convictions.findIndex((conviction) => conviction.index === parseInt(key[11], 10))
      if (key.includes('title')) {
        convictions[newindex].title = contentApi[key]
      }
      if (key.includes('desc')) {
        convictions[newindex].desc = contentApi[key]
      }
      if (key.includes('image')) {
        convictions[newindex].image = contentApi[key]
      }
    }
  })
  return convictions
}

function createExpertiseArray(contentApi: IndexContentAPI, keys: string[]) {
  const expertises: Expertise[] = []

  keys.forEach((key) => {
    const expertiseItem = expertises.findIndex((expertise) => expertise.index === parseInt(key[11], 10))
    if (!Number.isNaN(parseInt(key[11], 10))) {
      if (expertiseItem === -1) {
        const newExpertise = Object.create({ index: 0, title: '', items: [], trigram: '', logo: '' })
        newExpertise.index = parseInt(key[11], 10)
        expertises.push(newExpertise)
      }
      const newindex = expertises.findIndex((expertise) => expertise.index === parseInt(key[11], 10))
      if (key.includes('title')) {
        expertises[newindex].title = contentApi[key]
      }
      if (key.includes('items')) {
        expertises[newindex].items = contentApi[key]
      }
      if (key.includes('logo')) {
        expertises[newindex].logo = contentApi[key]
      }
    }
  })
  return expertises
}

export function convertIndexContentAPItoContentAPI(contentApi: IndexContentAPI) {
  const regexOffer = /cat_offres_[0-9]*/g
  const regexSector = /secteur_[0-9][0-9]*/g
  const regexConviction = /conviction_[0-9]*/g
  const regexExpertise = /expertises_[0-9]*/g
  return {
    hero_valeurs: contentApi.hero_valeurs,
    hero_subtitle: contentApi.hero_subtitle,
    hero_image: contentApi.hero_image,
    offres_title: contentApi.offres_title,
    offres: createOfferArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexOffer))
    ).filter((offre) => offre.title !== '' && offre.desc !== ''),
    secteurs_title: contentApi.secteurs_title,
    secteurs: createSectorArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexSector))
    ).filter((secteur) => secteur.desc !== '' && secteur.title !== ''),
    convictions_title: contentApi.convictions_title,
    convictions: createConvictionArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexConviction))
    ),
    expertises_title: contentApi.expertises_title,
    expertises_image_desktop: contentApi.expertises_image_desktop,
    expertises_image_mobile: contentApi.expertises_image_mobile,
    expertises: createExpertiseArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexExpertise))
    ),
    joinUs_human: contentApi.joinus_human,
    joinUs_image_desktop: contentApi.joinus_image_desktop,
    joinUs_image_mobile_1: contentApi.joinus_image_mobile_1,
    joinUs_image_mobile_2: contentApi.joinus_image_mobile_2,
    joinUs_agaetis_title: contentApi.joinus_agaetis_title,
    joinUs_agaetis_desc: contentApi.joinus_agaetis_desc,
    joinUs_carreer_title: contentApi.joinus_carreer_title,
    joinUs_carreer_desc: contentApi.joinus_carreer_desc,
  }
}
