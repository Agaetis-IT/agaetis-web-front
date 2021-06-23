import { AgaetisAPI } from '../models/AgaetisAPI'

export interface AgaetisContent {
  title: string
  background: string
  paragraph: string
  questions: Question[]
  numbersTitle: string
  numbers: Number[]
}

interface Question {
  question: string
  answer: string
  index: number
}

interface Number {
  index: number
  title: string
  data: string
  desc: string
}

function createNumberArray(contentApi: AgaetisAPI, keys: string[]) {
  const numbers: Number[] = []

  keys.forEach((key) => {
    const tabIndex = numbers.findIndex((tab) => tab.index === parseInt(key[6], 10))
    if (!Number.isNaN(parseInt(key[6], 10))) {
      if (tabIndex === -1) {
        const newTab = Object.create({ index: 0, title: '', data: '', desc: '' })
        newTab.index = parseInt(key[6], 10)
        numbers.push(newTab)
      }
      const newindex = numbers.findIndex((tab) => tab.index === parseInt(key[6], 10))
      numbers[newindex].title = contentApi[key].title
      numbers[newindex].desc = contentApi[key].description
      numbers[newindex].data = contentApi[key].data
    }
  })
  return numbers
}

function createQuestionArray(contentApi: AgaetisAPI, keys: string[]) {
  const questions: Question[] = []

  keys.forEach((key) => {
    const tabIndex = questions.findIndex((tab) => tab.index === parseInt(key[8], 10))
    if (!Number.isNaN(parseInt(key[8], 10))) {
      if (tabIndex === -1) {
        const newTab = Object.create({ index: 0, question: '', answer: '' })
        newTab.index = parseInt(key[8], 10)
        questions.push(newTab)
      }
      const newindex = questions.findIndex((tab) => tab.index === parseInt(key[8], 10))
      questions[newindex].question = contentApi[key].question
      questions[newindex].answer = contentApi[key].answer
    }
  })

  return questions
}

export function convertAgaetisAPItoContent(contentApi: AgaetisAPI) {
  const regexNumbers = /number[0-9]/g
  const regexQuestions = /question[0-9]/g
  return {
    title: contentApi.title,
    background: contentApi.background,
    paragraph: contentApi.paragraph,
    numbersTitle: contentApi.numbersTitle,
    numbers: createNumberArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexNumbers))
    ),
    questions: createQuestionArray(
      contentApi,
      Object.keys(contentApi).filter((key) => key.match(regexQuestions))
    ),
  }
}
