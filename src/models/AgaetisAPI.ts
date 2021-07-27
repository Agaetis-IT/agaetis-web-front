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
  number1: NumberAPI
  number2: NumberAPI
  number3: NumberAPI
  question1: QuestionAPI
  question2: QuestionAPI
  question3: QuestionAPI
  question4: QuestionAPI
  question5: QuestionAPI
  question6: QuestionAPI
  video: string
  videoTitle: string
}
