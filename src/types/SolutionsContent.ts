import SolutionsAPI from '../models/SolutionsAPI'

export interface SolutionsContent {
  title: string
  description: string
  needTitle: string
  responseTitle: string
  partnersTitle: string
  partners: {
    name: string
    image: string
  }[]
  phases: Phase[]
  whyUs: {
    title: string
    sections: WhyUsSection[]
  }
}

interface Phase {
  index: number
  header: string
  solutionImage: string
  needContent: string
  responseContent: string
}

interface WhyUsSection {
  index: number
  icon: string
  title: string
  description: string
}

export function compareWhyUsSection(a: WhyUsSection, b: WhyUsSection) {
  return a.index < b.index ? -1 : 1
}

export function comparePhases(a: Phase, b: Phase) {
  return a.index < b.index ? -1 : 1
}

function createPartnersArray(contentAPI: SolutionsAPI, keys: string[]) {
  const partners: {
    name: string
    image: string
  }[] = []

  keys.forEach((key) => {
    partners.push({
      name: contentAPI.partners[key].name,
      image: contentAPI.partners[key].image,
    })
  })

  return partners
}

function createWhyUsSections(contentAPI: SolutionsAPI, keys: string[]) {
  const sections: WhyUsSection[] = []

  keys.forEach((key) => {
    const index = sections.findIndex((section) => section.index === parseInt(key[7], 10))

    if (!Number.isNaN(parseInt(key[7], 10))) {
      if (index === -1) {
        const newSection = Object.create({
          index: parseInt(key[7], 10),
          icon: '',
          title: '',
          description: ''
        })

        sections.push(newSection)
      }

      const newIndex = sections.findIndex((section) => section.index === parseInt(key[7], 10))
      sections[newIndex].icon = contentAPI.whyUs[key].icon
      sections[newIndex].title = contentAPI.whyUs[key].title
      sections[newIndex].description = contentAPI.whyUs[key].description
    }
  })

  return sections
}

function createPhasesArray(contentAPI: SolutionsAPI, keys: string[]) {
  const phases: Phase[] = []

  keys.forEach((key) => {
    const phaseIndex = phases.findIndex((phase) => phase.index === parseInt(key[5], 10))

    if (!Number.isNaN(parseInt(key[5], 10))) {
      if (phaseIndex === -1) {
        const newPhase = Object.create({
          index: parseInt(key[5], 10),
          header: '',
          solutionImage: '',
          needContent: '',
          responseContent: '',
        })

        phases.push(newPhase)
      }

      const newIndex = phases.findIndex((phase) => phase.index === parseInt(key[5], 10))
      phases[newIndex].header = contentAPI[key].header
      phases[newIndex].solutionImage = contentAPI[key].solutionImage
      phases[newIndex].needContent = contentAPI[key].needContent
      phases[newIndex].responseContent = contentAPI[key].responseContent
    }
  })

  return phases
}

export function convertContentAPItoContent(contentAPI: SolutionsAPI) {
  const regexPhase = /phase[0-9]/
  const regexWhyUs = /section[0-9]/
  const regexPartner = /partner[0-9]/

  return {
    title: contentAPI.titre,
    description: contentAPI.description,
    needTitle: contentAPI.needTitle,
    responseTitle: contentAPI.responseTitle,
    partnersTitle: contentAPI.partners.title,
    partners: createPartnersArray(
      contentAPI,
      Object.keys(contentAPI.partners).filter((key) => key.match(regexPartner))
    ),
    phases: createPhasesArray(
      contentAPI,
      Object.keys(contentAPI).filter((key) => key.match(regexPhase))
    ).sort(comparePhases),
    whyUs: {
      title: contentAPI.whyUs.title,
      sections: createWhyUsSections(
        contentAPI,
        Object.keys(contentAPI.whyUs).filter((key) => key.match(regexWhyUs))
      ),
    },
  }
}
