/* eslint-disable @typescript-eslint/camelcase */
interface JobContentAPI {
  intitule_job: string
  description: string
  image: string
  offre_description: string
  offre_list_point1: string
  offre_list_point2: string
  offre_list_point3: string
  offre_list_point4: string
  offre_list_point5: string
  offre_list_point6: string
  offre_list_point7: string
  offre_list_point8: string
  offre_list_point9: string
  offre_list_point10: string
  offre_profile_description: string
  offre_salary: string
  offre_list_profile1: string
  offre_list_profile2: string
  offre_list_profile3: string
  offre_list_profile4: string
  offre_list_profile5: string
  offre_list_profile6: string
  offre_last_paragraph: string
  slug: string
  contact_text: string
}

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
