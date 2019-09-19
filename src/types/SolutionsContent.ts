export default interface SolutionsContentAPI {
  titre: string
  description: string
  tab1_header: string
  tab1_titre_section1: string
  tab1_contenu_section1: string
  tab1_titre_section2: string
  tab1_contenu_section2: string
  tab2_header: string
  tab2_titre_section1: string
  tab2_contenu_section1: string
  tab2_titre_section2: string
  tab2_contenu_section2: string
  tab3_header: string
  tab3_titre_section1: string
  tab3_contenu_section1: string
  tab3_titre_section2: string
  tab3_contenu_section2: string
  tab4_header: string
  tab4_titre_section1: string
  tab4_contenu_section1: string
  tab4_titre_section2: string
  tab4_contenu_section2: string
  why_us_title: string
  why_us_section1_icon: string
  why_us_section1_title: string
  why_us_section1_description: string
  why_us_section2_icon: string
  why_us_section2_title: string
  why_us_section2_description: string
  why_us_section3_icon: string
  why_us_section3_title: string
  why_us_section4_description: string
  partenaires_title: string
  partenaire1_img: string
  partenaire2_img: string
  partenaire3_img: string
  partenaire4_img: string
  solutions_img: string
}

export interface SolutionsContent {
  title: string
  description: string
  solutions_img: string
  tabs: Tab[]
  why_us: WhyUs
  partnerTitle: string
  partners: string[]
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
}

export function convertContentAPItoContent(contentApi: SolutionsContentAPI) {
  const regexPartners = /partenaire[0-9]/g
  const regexWhyUs = /why_us_[a-zA-Z_0-9]*/
  const regexTab = /tab[0-9][a-zA-Z0-9_]*/
  return {
    title: contentApi.titre,
    description: contentApi.description,
    solutions_img: contentApi.solutions_img,
    partnerTitle: contentApi.partenaires_title,
    partners: Object.keys(contentApi)
      .filter(key => key.match(regexPartners))
      .map(key => contentApi[key]),
    why_us: createWhyUsObject(contentApi, Object.keys(contentApi).filter(key => key.match(regexWhyUs))),
    tabs: createTabsArray(contentApi, Object.keys(contentApi).filter(key => key.match(regexTab))),
  }
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

export function compareTabs(a: Tab, b: Tab) {
  return a.index < b.index ? -1 : 1
}

function createWhyUsObject(contentApi: SolutionsContentAPI, keys: string[]) {
  const sections: Array<{
    index: number
    icon: string
    title: string
    description: string
  }> = []

  const whyUs = Object.create({ title: contentApi.why_us_title, sections: [] })
  keys.forEach(key => {
    const index = sections.findIndex(section => section.index === parseInt(key[14], 10))

    if (!Number.isNaN(parseInt(key[14], 10))) {
      // 15th character is the section number
      if (index === -1) {
        // create the new section
        const newSection = Object.create({ index: 0, icon: '', title: '', description: '' })
        newSection.index = parseInt(key[14], 10)
        sections.push(newSection) // add to sections tab
      }
      const newindex = sections.findIndex(section => section.index === parseInt(key[14], 10))
      // Add icon/title/desc to the good section
      if (key.includes('icon')) {
        sections[newindex].icon = contentApi[key]
      }
      if (key.includes('title')) {
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

function createTabsArray(contentApi: SolutionsContentAPI, keys: string[]) {
  const tabs: Tab[] = []

  keys.forEach(key => {
    const tabIndex = tabs.findIndex(tab => tab.index === parseInt(key[3], 10))
    if (!Number.isNaN(parseInt(key[3], 10))) {
      if (tabIndex === -1) {
        const newTab = Object.create({ index: 0, header: '', sections: [] })
        newTab.index = parseInt(key[3], 10)
        newTab.sections = []
        tabs.push(newTab)
      }
      const newindex = tabs.findIndex(tab => tab.index === parseInt(key[3], 10))
      if (key.includes('header')) {
        tabs[newindex].header = contentApi[key]
      }
      createTabSections(tabs, newindex, contentApi, key)
    }
  })
  return tabs
}

function createTabSections(tabs: Tab[], tabIndex: number, content: SolutionsContentAPI, key: string) {
  const sectionIndex = tabs[tabIndex].sections.findIndex(section => section.index === parseInt(key.slice(-1), 10))
  if (!Number.isNaN(parseInt(key.slice(-1), 10))) {
    if (sectionIndex === -1) {
      const newSection = Object.create({ index: 0, title: '', description: '' })
      newSection.index = parseInt(key.slice(-1), 10)
      tabs[tabIndex].sections.push(newSection)
    }
    const newsectionIndex = tabs[tabIndex].sections.findIndex(section => section.index === parseInt(key.slice(-1), 10))
    if (key.includes('titre')) {
      tabs[tabIndex].sections[newsectionIndex].title = content[key]
    }
    if (key.includes('contenu')) {
      tabs[tabIndex].sections[newsectionIndex].description = content[key]
    }
  }
}
