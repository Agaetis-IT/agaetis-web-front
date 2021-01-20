import JobContentAPI from '../models/JobAPI'

/* eslint-disable @typescript-eslint/camelcase */
interface JobDescription {
  intitule_job: string
  description: string
}

export interface JobContentLite {
  acf: JobDescription
  slug: string
}

export default interface JobContent {
  title: string
  description: string
  offre_description: string
  profile_description: string
  offre_list: string[]
  offre_profile: string[]
  offre_salary: string
  offre_last_paragraph: string
  slug: string
  image: string
  contact_text: string
}

export function convertJobContentAPItoContent(contentApi: JobContentAPI) {
  const regexOfferList = /offre_list_mission[0-9]*/g
  const regexProfileList = /offre_list_profile[0-9]*/g
  return {
    title: contentApi.intitule_job,
    slug: contentApi.slug,
    image: contentApi.image,
    description: contentApi.description,
    offre_salary: contentApi.offre_salary,
    profile_description: contentApi.offre_profile_description,
    offre_description: contentApi.offre_description,
    offre_last_paragraph: contentApi.offre_last_paragraph,
    offre_list: Object.keys(contentApi)
      .filter((key) => key.match(regexOfferList))
      .map((key) => contentApi[key]),
    offre_profile: Object.keys(contentApi)
      .filter((key) => key.match(regexProfileList))
      .map((key) => contentApi[key]),
    contact_text: contentApi.contact_text,
  }
}
