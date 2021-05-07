import { NextPageContext } from 'next'
import { CategoryAPI, PostAPI } from '../models/IdeasAPI'
import { getCategories, getIdeasPageContent, getAllWhitePapers, getIdeasByTag } from '../Services/wordpressService'
import WhitePaper from '../types/WhitePaper'

import { Category } from '../types/IdeasContent'

import Blog from '../components/Blog'

export default Blog

interface Context extends NextPageContext {
  query: { slug: string }
}

export async function getServerSideProps({ query }: Context) {
  const { [0]: ideas, [1]: categories, [2]: content, [3]: whitepapers } = await Promise.all([
    getIdeasByTag(query.slug),
    getCategories(),
    getIdeasPageContent(),
    getAllWhitePapers(),
  ])

  content.description = `Découvrez nos articles avec le tag #${query.slug}.`

  return {
    props: {
      ideasDescription: ideas.data.map((idea: PostAPI) => ({
        id: idea.id,
        title: idea.title.rendered,
        categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
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
      hideSeeMore: ideas.pageCount == 1,
      tagFilter: query.slug.charAt(0).toUpperCase() + query.slug.slice(1),
    },
  }
}
