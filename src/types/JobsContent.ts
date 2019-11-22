export default interface JobsContentAPI {
  titre: string
  description: string
  jobsimg: string
  slide1_quote: string
  slide1_quote_author: string
  slide1_quote_author_role: string
  slide1_Img: string
  slide2_quote: string
  slide2_quote_author: string
  slide2_quote_author_role: string
  slide2_Img: string
  slide3_quote: string
  slide3_quote_author: string
  slide3_quote_author_role: string
  slide3_Img: string
  we_are_agaetis_title: string
  we_are_agaetis_img: string
  we_are_agaetis_paragraph: string
  join_us_title: string
  join_us_description: string
  join_us_step1_title: string
  join_us_step1_description: string
  join_us_step2_title: string
  join_us_step2_description: string
  join_us_step3_title: string
  join_us_step3_description: string
  profile_title: string
  profile_value1_img: string
  profile_value1_title: string
  profile_value1_description: string
  profile_value2_img: string
  profile_value2_title: string
  profile_value2_description: string
  profile_value3_img: string
  profile_value3_title: string
  profile_value3_description: string
  profile_value4_img: string
  profile_value4_title: string
  profile_value4_description: string
  offers_title: string
  offers_button: string
}

export interface JobsContent {
  title: string
  description: string
  jobsImg: string
  slides: Slide[]
  we_are_agaetis_title: string
  we_are_agaetis_Img: string
  we_are_agaetis_paragraph: string
  joinUsSection: JoinUsSection
  profilesSection: ProfilesSection
  offers_title: string
  offers_button: string
}

interface JoinUsSection {
  title: string
  description: string
  steps: Step[]
}

interface ProfilesSection {
  title: string
  description: string
  profiles: Profile[]
}

export interface Slide {
  index: number
  quote: string
  author: string
  role: string
  img: string
}

interface Step {
  index: number
  title: string
  description: string
}

interface Profile {
  index: number
  title: string
  img: string
  description: string
}

// TODO voir pour refactorer en fonctionnelle
export function convertJobsContentAPItoContent(contentApi: JobsContentAPI) {
  const regexSlides = /slide[0-9][a-zA-Z0-9_]*/
  const regexJoinUs = /join_us[a-zA-Z0-9_]*/
  const regexProfiles = /profile[a-zA-Z0-9_]*/
  return {
    title: contentApi.titre,
    description: contentApi.description,
    jobsImg: contentApi.jobsimg,
    slides: createSlideArray(contentApi, Object.keys(contentApi).filter(key => key.match(regexSlides))),
    joinUsSection: createJoinUsSectionObject(contentApi, Object.keys(contentApi).filter(key => key.match(regexJoinUs))),
    profilesSection: createProfilesSectionObject(
      contentApi,
      Object.keys(contentApi).filter(key => key.match(regexProfiles))
    ),
    we_are_agaetis_Img: contentApi.we_are_agaetis_img,
    we_are_agaetis_title: contentApi.we_are_agaetis_title,
    we_are_agaetis_paragraph: contentApi.we_are_agaetis_paragraph,
    offers_button: contentApi.offers_button,
    offers_title: contentApi.offers_title,
  }
}

function createSlideArray(contentApi: JobsContentAPI, keys: string[]) {
  const slides: Slide[] = []
  keys.forEach(key => {
    const slideIndex = slides.findIndex(slide => slide.index === parseInt(key[5], 10))
    if (!Number.isNaN(parseInt(key[5], 10))) {
      if (slideIndex === -1) {
        const newSlide = Object.create({ index: 0, quote: '', author: '', img: '' })
        newSlide.index = parseInt(key[5], 10)
        slides.push(newSlide)
      }
      const newindex = slides.findIndex(slide => slide.index === parseInt(key[5], 10))
      if (key.includes('quote') && !key.includes('quote_author') && !key.includes('quote_author_role')) {
        slides[newindex].quote = contentApi[key]
      }
      if (key.includes('quote_author') && !key.includes('quote_author_role')) {
        slides[newindex].author = contentApi[key]
      }
      if (key.includes('quote_author_role')) {
        slides[newindex].role = contentApi[key]
      }
      if (key.includes('img')) {
        slides[newindex].img = contentApi[key]
      }
    }
  })
  return slides
}

function createJoinUsSectionObject(contentApi: JobsContentAPI, keys: string[]) {
  const steps: Array<{
    index: number
    title: string
    description: string
  }> = []

  const joinUs = Object.create({
    title: '',
    description: '',
    steps: [],
  })

  keys.forEach(key => {
    const index = steps.findIndex(step => step.index === parseInt(key[12], 10))

    if (!Number.isNaN(parseInt(key[12], 10))) {
      if (index === -1) {
        const newStep = Object.create({ index: 0, title: '', description: '' })
        newStep.index = parseInt(key[12], 10)
        steps.push(newStep)
      }
      const newindex = steps.findIndex(step => step.index === parseInt(key[12], 10))
      if (key.includes('title')) {
        steps[newindex].title = contentApi[key]
      }
      if (key.includes('description')) {
        steps[newindex].description = contentApi[key]
      }
    }
  })
  joinUs.title = contentApi.join_us_title
  joinUs.description = contentApi.join_us_description
  joinUs.steps = steps
  return joinUs
}

function createProfilesSectionObject(contentApi: JobsContentAPI, keys: string[]) {
  const profiles: Array<{
    index: number
    title: string
    img: string
    description: string
  }> = []

  const profilesSection = Object.create({
    title: '',
    profiles: [],
  })
  keys
    .filter(key => key.includes('value'))
    .forEach(key => {
      const index = profiles.findIndex(profile => profile.index === parseInt(key[13], 10))

      if (!Number.isNaN(parseInt(key[13], 10))) {
        if (index === -1) {
          const newProfile = Object.create({ index: 0, title: '', description: '', img: '' })
          newProfile.index = parseInt(key[13], 10)
          profiles.push(newProfile)
        }
        const newindex = profiles.findIndex(profile => profile.index === parseInt(key[13], 10))
        if (key.includes('title')) {
          profiles[newindex].title = contentApi[key]
        }
        if (key.includes('description')) {
          profiles[newindex].description = contentApi[key]
        }
        if (key.includes('img')) {
          profiles[newindex].img = contentApi[key]
        }
      }
    })
  profilesSection.title = contentApi.profile_title
  profilesSection.profiles = profiles
  return profilesSection
}
