/* eslint-disable @typescript-eslint/camelcase */
export default interface SolutionsContentAPI {
  titre: string
  description: string

  tab1_header: string
  tab1_titre_section1: string
  tab1_contenu_section1: string
  tab1_titre_section2: string
  tab1_contenu_section2: string

  tab1_why_us_title: string
  tab1_why_us_section1_icon: string
  tab1_why_us_section1_title: string
  tab1_why_us_section1_description: string
  tab1_why_us_section2_icon: string
  tab1_why_us_section2_title: string
  tab1_why_us_section2_description: string
  tab1_why_us_section3_icon: string
  tab1_why_us_section3_title: string
  tab1_why_us_section3_description: string

  tab1_partenaires_title: string
  tab1_partenaire1_img: string
  tab1_partenaire2_img: string
  tab1_partenaire3_img: string
  tab1_partenaire4_img: string
  tab1_solutions_img: string

  tab2_header: string
  tab2_titre_section1: string
  tab2_contenu_section1: string
  tab2_titre_section2: string
  tab2_contenu_section2: string

  tab2_why_us_title: string
  tab2_why_us_section1_icon: string
  tab2_why_us_section1_title: string
  tab2_why_us_section1_description: string
  tab2_why_us_section2_icon: string
  tab2_why_us_section2_title: string
  tab2_why_us_section2_description: string
  tab2_why_us_section3_icon: string
  tab2_why_us_section3_title: string
  tab2_why_us_section3_description: string

  tab2_partenaires_title: string
  tab2_partenaire1_img: string
  tab2_partenaire2_img: string
  tab2_partenaire3_img: string
  tab2_partenaire4_img: string
  tab2_solutions_img: string

  tab3_header: string
  tab3_titre_section1: string
  tab3_contenu_section1: string
  tab3_titre_section2: string
  tab3_contenu_section2: string

  tab3_why_us_title: string
  tab3_why_us_section1_icon: string
  tab3_why_us_section1_title: string
  tab3_why_us_section1_description: string
  tab3_why_us_section2_icon: string
  tab3_why_us_section2_title: string
  tab3_why_us_section2_description: string
  tab3_why_us_section3_icon: string
  tab3_why_us_section3_title: string
  tab3_why_us_section3_description: string

  tab3_partenaires_title: string
  tab3_partenaire1_img: string
  tab3_partenaire2_img: string
  tab3_partenaire3_img: string
  tab3_partenaire4_img: string
  tab3_solutions_img: string

  tab4_header: string
  tab4_titre_section1: string
  tab4_contenu_section1: string
  tab4_titre_section2: string
  tab4_contenu_section2: string

  tab4_why_us_title: string
  tab4_why_us_section1_icon: string
  tab4_why_us_section1_title: string
  tab4_why_us_section1_description: string
  tab4_why_us_section2_icon: string
  tab4_why_us_section2_title: string
  tab4_why_us_section2_description: string
  tab4_why_us_section3_icon: string
  tab4_why_us_section3_title: string
  tab4_why_us_section3_description: string

  tab4_partenaires_title: string
  tab4_partenaire1_img: string
  tab4_partenaire2_img: string
  tab4_partenaire3_img: string
  tab4_partenaire4_img: string
  tab4_solutions_img: string
}

export interface SolutionsContent {
  title: string
  description: string
  tabs: Tab[]
}

interface WhyUs {
  title: string
  sections: Array<{
    index: number
    icon: string
    title: string
    description: string
  }>
}

export interface Tab {
  index: number
  header: string
  sections: Array<{
    index: number
    title: string
    description: string
  }>
  solutions_img: string
  whyUs: WhyUs
  partnerTitle: string
  partners: string[]
}

export function compareWhyUsSection(
  a: {
    index: number
    icon: string
    title: string
    description: string
  },
  b: {
    index: number
    icon: string
    title: string
    description: string
  }
) {
  return a.index < b.index ? -1 : 1
}

export function compareTabsSection(
  a: {
    index: number
    title: string
    description: string
  },
  b: {
    index: number
    title: string
    description: string
  }
) {
  return a.index < b.index ? -1 : 1
}

function createPartnerArray(content: SolutionsContentAPI, tabIndex: number, keys: string[]) {
  const partners: string[] = []
  keys.forEach((key) => {
    if (key.includes(`tab${tabIndex}_partenaire`) && key.includes('_img')) {
      partners.push(content[key])
    }
  })
  return partners
}

function createWhyUsObject(contentApi: SolutionsContentAPI, keys: string[]) {
  const sections: Array<{
    index: number
    icon: string
    title: string
    description: string
  }> = []

  const whyUs = Object.create({ title: '', sections: [] })
  keys.forEach((key) => {
    const index = sections.findIndex((section) => section.index === parseInt(key[19], 10))
    if (key.includes('why_us_title')) {
      whyUs.title = contentApi[key]
    }
    if (!Number.isNaN(parseInt(key[19], 10))) {
      // 19th character is the section number
      if (index === -1) {
        // create the new section
        const newSection = Object.create({ index: 0, icon: '', title: '', description: '' })
        newSection.index = parseInt(key[19], 10)
        sections.push(newSection) // add to sections tab
      }
      const newindex = sections.findIndex((section) => section.index === parseInt(key[19], 10))
      // Add icon/title/desc to the good section
      if (key.includes('icon')) {
        sections[newindex].icon = contentApi[key]
      }
      if (key.includes('section') && key.includes('title')) {
        sections[newindex].title = contentApi[key]
      }
      if (key.includes('description')) {
        sections[newindex].description = contentApi[key]
      }
    }
  })

  whyUs.sections = sections
  return whyUs
}

function createTabSections(content: SolutionsContentAPI, keys: string[]) {
  const sections: Array<{
    index: number
    title: string
    description: string
  }> = []
  keys.forEach((key) => {
    const sectionsIndex = sections.findIndex((tab) => tab.index === parseInt(key.slice(-1), 10))
    if (!Number.isNaN(parseInt(key.slice(-1), 10))) {
      if (sectionsIndex === -1) {
        const newSection = Object.create({ index: 0, title: '', description: '' })
        newSection.index = parseInt(key[key.length - 1], 10)
        sections.push(newSection)
      }

      const newsectionIndex = sections.findIndex((section) => section.index === parseInt(key[key.length - 1], 10))
      if (key.includes('titre_section')) {
        sections[newsectionIndex].title = content[key]
      }
      if (key.includes('contenu_section')) {
        sections[newsectionIndex].description = content[key]
      }
    }
  })

  return sections
}

// TODO voir pour refactorer en fonctionnelle
function createTabsArray(contentApi: SolutionsContentAPI, keys: string[]) {
  const tabs: Tab[] = []

  keys.forEach((key) => {
    const tabIndex = tabs.findIndex((tab) => tab.index === parseInt(key[3], 10))
    if (!Number.isNaN(parseInt(key[3], 10))) {
      if (tabIndex === -1) {
        const newTab = Object.create({
          index: 0,
          header: '',
          solutions_img: '',
          sections: [],
          why_us: null,
          partnerTitle: '',
          partners: [],
        })
        newTab.index = parseInt(key[3], 10)
        tabs.push(newTab)
      }
      const newindex = tabs.findIndex((tab) => tab.index === parseInt(key[3], 10))

      if (key.includes('header')) {
        tabs[newindex].header = contentApi[key]
      }
      if (key.includes('solutions_img')) {
        tabs[newindex].solutions_img = contentApi[key]
      }
      if (key.includes('partenaires_title')) {
        tabs[newindex].partnerTitle = contentApi[key]
      }
      if (key.includes(`tab${parseInt(key[3], 10)}_partenaire`) && key.includes('_img')) {
        tabs[newindex].partners = createPartnerArray(contentApi, parseInt(key[3], 10), keys)
      }
      if (!tabs[newindex].whyUs) {
        tabs[newindex].whyUs = createWhyUsObject(
          contentApi,
          keys.filter((k) => k.includes(`tab${parseInt(key[3], 10)}_why_us_`))
        )
      }
      if (tabs[newindex].sections !== []) {
        tabs[newindex].sections = createTabSections(
          contentApi,
          keys.filter((k) => {
            return (
              k.includes(`tab${parseInt(key[3], 10)}_titre_section`) ||
              k.includes(`tab${parseInt(key[3], 10)}_contenu_section`)
            )
          })
        )
      }
    }
  })
  return tabs
}

export function convertContentAPItoContent(contentApi: SolutionsContentAPI) {
  const regexTab = /tab[0-9][a-zA-Z0-9_]*/
  return {
    title: contentApi.titre,
    description: contentApi.description,
    tabs: createTabsArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexTab))
    ),
  }
}

export function compareTabs(a: Tab, b: Tab) {
  return a.index < b.index ? -1 : 1
}
