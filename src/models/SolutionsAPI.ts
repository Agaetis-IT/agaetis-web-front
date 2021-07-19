export default interface SolutionsAPI {
  titre: string
  description: string
  needTitle: string
  responseTitle: string
  whyUs: {
    title: string
    background: string
    section1: {
      title: string
      description: string
      icon: string
    }
    section2: {
      title: string
      description: string
      icon: string
    }
    section3: {
      title: string
      description: string
      icon: string
    }
  }
  phase1: {
    header: string
    solutionImage: string
    needContent: string
    responseContent: string
  }
  phase2: {
    header: string
    solutionImage: string
    needContent: string
    responseContent: string
  }
  phase3: {
    header: string
    solutionImage: string
    needContent: string
    responseContent: string
  }
  phase4: {
    header: string
    solutionImage: string
    needContent: string
    responseContent: string
  }
  partners: {
    title: string
    partner1: {
      name: string
      image: string
    }
    partner2: {
      name: string
      image: string
    }
    partner3: {
      name: string
      image: string
    }
    partner4: {
      name: string
      image: string
    }
  }
}
