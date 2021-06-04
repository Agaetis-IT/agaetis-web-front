import { TagAPI, PostAPI, CategoryAPI } from '../../../models/IdeasAPI'
import { getCategories, getIdeasPageContent, getAllWhitePapers, getIdeasByTag, getTags } from '../../../services/wordpressService'
import WhitePaper from '../../../types/WhitePaper'

import { Category } from '../../../types/IdeasContent'

import Blog from '../../../components/Blog'

export default Blog

export async function getStaticPaths() {
  const tags = await getTags()

  return {
    paths: tags.map((tag: TagAPI) => ({
      params: {
        tagSlug: tag.slug
      }
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { [0]: ideas, [1]: categories, [2]: content, [3]: whitepapers } = await Promise.all([
    getIdeasByTag(params.tagSlug),
    getCategories(),
    getIdeasPageContent(),
    getAllWhitePapers(),
  ])

  content.description = `Découvrez nos articles avec le tag #${params.tagSlug}.`

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
      tagFilter: params.tagSlug.charAt(0).toUpperCase() + params.tagSlug.slice(1),
    },
  }
}
