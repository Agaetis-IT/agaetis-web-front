export interface AgaetisContentApi {
  title: string
  paragraph: string
  vision_title: string
  vision_paragraph: string
  vision_img: string
  innovation_title: string
  innovation_paragraph: string
  innovation_img: string
  histoire_title: string
  histoire_paragraph: string
  histoire_img: string
  chiffres_title: string
  chiffre1_title: string
  chiffre1_data: string
  chiffre1_description: string
  chiffre2_title: string
  chiffre2_data: string
  chiffre2_description: string
  chiffre3_title: string
  chiffre3_data: string
  chiffre3_description: string
}

export interface AgaetisContent {
  title: string
  paragraph: string
  vision_title: string
  vision_paragraph: string
  vision_img: string
  innovation_title: string
  innovation_paragraph: string
  innovation_img: string
  histoire_title: string
  histoire_paragraph: string
  histoire_img: string
  chiffres_title: string
  chiffres: Chiffre[]
}

interface Chiffre {
  index: number
  title: string
  data: string
  desc: string
}

export function convertAgaetisAPItoContent(contentApi: AgaetisContentApi) {
  const regexChiffres = /chiffre[0-9]/g
  return {
    ...contentApi,
    chiffres: createChiffreArray(contentApi, Object.keys(contentApi).filter(key => key.match(regexChiffres))),
  }
}

function createChiffreArray(contentApi: AgaetisContentApi, keys: string[]) {
  const chiffres: Chiffre[] = []

  keys.forEach(key => {
    const tabIndex = chiffres.findIndex(tab => tab.index === parseInt(key[7], 10))
    if (!Number.isNaN(parseInt(key[7], 10))) {
      if (tabIndex === -1) {
        const newTab = Object.create({ index: 0, title: '', data: '', desc: '' })
        newTab.index = parseInt(key[7], 10)
        newTab.sections = []
        chiffres.push(newTab)
      }
      const newindex = chiffres.findIndex(tab => tab.index === parseInt(key[7], 10))
      if (key.includes('title')) {
        chiffres[newindex].title = contentApi[key]
      }
      if (key.includes('description')) {
        chiffres[newindex].desc = contentApi[key]
      }
      if (key.includes('data')) {
        chiffres[newindex].data = contentApi[key]
      }
    }
  })
  return chiffres
}
