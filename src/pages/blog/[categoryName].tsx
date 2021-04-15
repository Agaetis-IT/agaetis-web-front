import { NextPageContext } from 'next'
import Ideas from '../../components/Ideas'
import { CategoryAPI, PostAPI } from '../../models/IdeasAPI'
import { slugify } from '../../Services/textUtilities'
import {
  getIdeasByPage,
  getCategories,
  getIdeasPageContent,
  getAllWhitePapers,
  getIdeasByCategory,
} from '../../Services/wordpressService'
import { Category, Response } from '../../types/IdeasContent'
import WhitePaper from '../../types/WhitePaper'

interface Context extends NextPageContext {
  query: { categoryName: string }
}

export async function getServerSideProps({ query }: Context) {
  let selectedCategory = ''
  const { [0]: categories, [1]: content, [2]: whitepapers } = await Promise.all([
    getCategories(),
    getIdeasPageContent(),
    getAllWhitePapers(),
  ])
  let promiseResult: Response

  if (!query.categoryName) {
    promiseResult = await getIdeasByPage()
  } else {
    const names = categories
      .map((category: CategoryAPI) => slugify(category.name))
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

    selectedCategory = categories.filter((category: CategoryAPI) => category.slug == query.categoryName)[0].slug
    promiseResult = await getIdeasByCategory(selectedCategory)
  }

  return {
    props: {
      ideasDescription: promiseResult.data.map((idea: PostAPI) => ({
        id: idea.id,
        title: idea.title.rendered,
        categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
        tags: [],
        slug: idea.slug,
        descriptionText: idea.acf.idea_description,
        date: idea.date,
        image: idea.acf.idea_image,
      })),
      whitePapers:
        whitepapers && whitepapers.length > 0
          ? whitepapers.map((whitepaper: { slug: string; acf: WhitePaper }) => ({
              slug: whitepaper.slug,
              ...whitepaper.acf,
            }))
          : [],
      content,
      categories: categories
        .map((category: CategoryAPI) => ({ categoryId: category.id, categoryName: category.name }))
        .filter((category: Category) => !category.categoryName.includes('_offer-')),
      selectedCategory: selectedCategory,
      hideSeeMore: promiseResult.pageCount <= 1,
    },
  }
}

export default Ideas
