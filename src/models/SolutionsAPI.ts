export default interface SolutionsAPI {
  description: string
  needTitle: string
  responseTitle: string
  whyUs: {
    title: string
    background: string
    sections: WhyUsSection[]
  }
  phases: Phase[]
  partners: {
    title: string
    partners: Partner[]
  }
}

interface Partner {
  name: string
  image: string
}

interface Phase {
  header: string
  solutionImage: string
  needContent: string
  responseContent: string
}

interface WhyUsSection {
  title: string
  description: string
  icon: string
}
