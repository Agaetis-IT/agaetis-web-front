import { NextPageContext } from 'next'
import Ideas from '../../components/Ideas'
import { slugify } from '../../Services/textUtilities'
import { getIdeasByPage, getCategories, getIdeasPageContent, getAllWhitePapers } from '../../Services/wordpressService'
import { IdeasDesc } from '../../types/IdeasContent'
import WhitePaper from '../../types/WhitePaper'

interface Context extends NextPageContext {
  query: { categoryName: string }
}

export async function getServerSideProps({ query }: Context) {
  let selectedCategory: string = null
  const { [0]: categories, [1]: content, [2]: whitepapers } = await Promise.all([
    getCategories(),
    getIdeasPageContent(),
    getAllWhitePapers(),
  ])
  let ideas: IdeasDesc[] = []
  let i = 0

  if (!query.categoryName) {
    ideas = (await Promise.all([getIdeasByPage(0)])[0]).map((idea: any) => ({
      id: idea.id,
      title: idea.title.rendered,
      categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
      slug: idea.slug,
      descriptionText: idea.acf.idea_description,
      date: idea.date,
      image: idea.acf.idea_image,
    }))
  } else {
    const names = categories
      .map((category: any) => slugify(category.name))
      .filter((name: string) => !name.includes('_offer-'))

    if (!names.includes(query.categoryName)) {
      return {
        props: {
          ideasDescription: [],
          whitePapers: [],
          categories: [],
          content: null,
          errorCode: 404,
        },
      }
    }

    selectedCategory = categories.filter((category: any) => category.slug == query.categoryName)[0].name
    let continueFetch = true

    while (ideas.length < 9 && continueFetch) {
      const { [0]: newData } = await Promise.all([getIdeasByPage(i)])

      if (newData.length < 9) continueFetch = false

      ideas = ideas.concat(
        newData
          .map((idea: any) => ({
            id: idea.id,
            title: idea.title.rendered,
            categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
            slug: idea.slug,
            descriptionText: idea.acf.idea_description,
            date: idea.date,
            image: idea.acf.idea_image,
          }))
          .filter(
            (idea) =>
              !idea.categories.includes('White-paper') &&
              !idea.categories.includes('Jobs') &&
              idea.categories.includes(selectedCategory)
          )
      )

      i += newData.length
    }

    if (continueFetch) {
      i -= ideas.length - 9
      ideas = ideas.slice(0, 9)
    }
  }

  return {
    props: {
      ideasDescription: ideas,
      whitePapers:
        whitepapers && whitepapers.length > 0
          ? whitepapers.map((whitepaper: { slug: string; acf: WhitePaper }) => ({
              slug: whitepaper.slug,
              ...whitepaper.acf,
            }))
          : [],
      content,
      categories: categories
        .map((category: any) => ({ categoryId: category.id, categoryName: category.name }))
        .filter((category: any) => !category.categoryName.includes('_offer-')),
      selectedCategory: selectedCategory,
      offset: i,
    },
  }
}

export default Ideas
