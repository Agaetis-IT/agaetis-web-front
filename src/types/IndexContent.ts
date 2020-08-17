/* eslint-disable @typescript-eslint/camelcase */

export default interface IndexContentAPI {
  hero_valeurs: string
  hero_subtitle: string
  hero_image: string
  offres_title: string
  cat_offres_1_title: string
  cat_offres_1_short_desc: string
  cat_offres_1_desc: string
  cat_offres_1_image: string
  cat_offres_2_title: string
  cat_offres_2_short_desc: string
  cat_offres_2_desc: string
  cat_offres_2_image: string
  cat_offres_3_title: string
  cat_offres_3_short_desc: string
  cat_offres_3_desc: string
  cat_offres_3_image: string
  cat_offres_4_title: string
  cat_offres_4_short_desc: string
  cat_offres_4_desc: string
  cat_offres_4_image: string
  cat_offres_5_title: string
  cat_offres_5_short_desc: string
  cat_offres_5_desc: string
  cat_offres_5_image: string
  secteurs_title: string
  secteur_01_title: string
  secteur_01_description: string
  secteur_01_image: string
  secteur_02_title: string
  secteur_02_description: string
  secteur_02_image: string
  secteur_03_title: string
  secteur_03_description: string
  secteur_03_image: string
  secteur_04_title: string
  secteur_04_description: string
  secteur_04_image: string
  secteur_05_title: string
  secteur_05_description: string
  secteur_05_image: string
  secteur_06_title: string
  secteur_06_description: string
  secteur_06_image: string
  secteur_07_title: string
  secteur_07_description: string
  secteur_07_image: string
  secteur_08_title: string
  secteur_08_description: string
  secteur_08_image: string
  secteur_09_title: string
  secteur_09_description: string
  secteur_09_image: string
  secteur_10_title: string
  secteur_10_description: string
  secteur_10_image: string
  convictions_title: string
  conviction_1_title: string
  conviction_1_description: string
  conviction_1_image: string
  conviction_2_title: string
  conviction_2_description: string
  conviction_2_image: string
  conviction_3_title: string
  conviction_3_description: string
  conviction_3_image: string
  conviction_4_title: string
  conviction_4_description: string
  conviction_4_image: string
}

export interface IndexContentV2 {
  hero_valeurs: string
  hero_subtitle: string
  hero_image: string
  offres_title: string
  offres: OfferDesc[]
  secteurs_title: string
  secteurs: SectorDesc[]
  convictions_title: string
  convictions: Conviction[]
}

export interface OfferDesc {
  index: number
  title: string
  short_desc: string
  desc: string
  image: string
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

export function convertIndexContentAPItoContentAPI(contentApi: IndexContentAPI) {
  const regexOffer = /cat_offres_[0-9]*/g
  const regexSector = /secteur_[0-9][0-9]*/g
  const regexConviction = /conviction_[0_9]*/g
  return {
    hero_valeurs: contentApi.hero_valeurs,
    hero_subtitle: contentApi.hero_subtitle,
    hero_image: contentApi.hero_image,
    offres_title: contentApi.offres_title,
    offres: createOfferArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexOffer))
    ),
    secteurs_title: contentApi.secteurs_title,
    secteurs: createSectorArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexSector))
    ),
    convictions_title: contentApi.convictions_title,
    convictions: createConvictionArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexConviction))
    ),
  }
}
