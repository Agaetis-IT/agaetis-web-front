interface NumberAPI {
  title: string
  description: string
  data: number
}

interface QuestionAPI {
  question: string
  answer: string
}

export interface AgaetisAPI {
  title: string
  background: string
  paragraph: string
  numbersTitle: string
  numbersBack: string
  numbers: NumberAPI[]
  questions: QuestionAPI[]
  video: string
  videoTitle: string
}
