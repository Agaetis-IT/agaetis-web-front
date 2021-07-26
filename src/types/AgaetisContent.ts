import { AgaetisContentApi } from '../models/AgaetisAPI'

export interface AgaetisContent {
  title: string
  paragraph: string
  questions: Question[]
  chiffres_title: string
  chiffres: Chiffre[]
  video: string
  videoTitle: string
}

interface Question {
  intitule: string
  reponse: string
  index: number
}

interface Chiffre {
  index: number
  title: string
  data: string
  desc: string
}

function createChiffreArray(contentApi: AgaetisContentApi, keys: string[]) {
  const chiffres: Chiffre[] = []

  keys.forEach((key) => {
    const tabIndex = chiffres.findIndex((tab) => tab.index === parseInt(key[7], 10))
    if (!Number.isNaN(parseInt(key[7], 10))) {
      if (tabIndex === -1) {
        const newTab = Object.create({ index: 0, title: '', data: '', desc: '' })
        newTab.index = parseInt(key[7], 10)
        newTab.sections = []
        chiffres.push(newTab)
      }
      const newindex = chiffres.findIndex((tab) => tab.index === parseInt(key[7], 10))
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

function createQuestionArray(contentApi: AgaetisContentApi, keys: string[]) {
  const questions: Question[] = []

  keys.forEach((key) => {
    const tabIndex = questions.findIndex((tab) => tab.index === parseInt(key[8], 10))
    if (!Number.isNaN(parseInt(key[8], 10))) {
      if (tabIndex === -1) {
        const newTab = Object.create({ index: 0, intitule: '', reponse: '' })
        newTab.index = parseInt(key[8], 10)
        newTab.sections = []
        questions.push(newTab)
      }
      const newindex = questions.findIndex((tab) => tab.index === parseInt(key[8], 10))
      if (key.includes('intitule')) {
        questions[newindex].intitule = contentApi[key]
      }
      if (key.includes('reponse')) {
        questions[newindex].reponse = contentApi[key]
      }
    }
  })

  return questions
}

export function convertAgaetisAPItoContent(contentApi: AgaetisContentApi) {
  const regexChiffres = /chiffre[0-9]/g
  const regexQuestions = /question[0-9]/g
  return {
    title: contentApi.title,
    paragraph: contentApi.paragraph,
    video: contentApi.video,
    videoTitle: contentApi.videoTitle,
    chiffres: createChiffreArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexChiffres))
    ),
    questions: createQuestionArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexQuestions))
    ),
  }
}
