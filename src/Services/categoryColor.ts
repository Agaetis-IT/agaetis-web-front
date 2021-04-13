/* purgecss start ignore */

export function getBgColor(category: string) {
  switch (category) {
    case 'Agaetis':
    case 'Evènements':
      return 'bg-orange'
    case 'Stratégie SI':
      return 'bg-blue'
    case 'Data':
      return 'bg-teal'
    case 'Service Design':
      return 'bg-light-pink'
    case 'Technologie':
      return 'bg-yellow'
    case 'Agilité':
      return 'bg-light-purple'
    case 'Business Hacking':
      return 'bg-red-lighter'
    default:
      return 'bg-grey'
  }
}

/* purgecss end ignore */
