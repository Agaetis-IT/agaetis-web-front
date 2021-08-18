import Blog from '../../../components/Blog'

import { Category } from '../../../types/PostPageContent'
import {
  getCategories,
  getBlogPageContent,
  getPostsByTag,
  getTags,
} from '../../../services/wordpressService'
import { TagAPI, PostAPI, CategoryAPI } from '../../../models/PostAPI'

export default Blog

export async function getStaticPaths() {
  const tags = await getTags()

  return {
    paths: tags.map((tag: TagAPI) => ({
      params: {
        tagSlug: tag.slug,
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    const {
      [0]: ideas,
      [1]: categories,
      [2]: content,
    } = await Promise.all([getPostsByTag(params.tagSlug), getCategories(), getBlogPageContent()])

    content.description = `Découvrez nos articles avec le tag #${params.tagSlug}.`

    return {
      props: {
        ideasDescription: ideas.data.map((idea: PostAPI) => ({
          id: idea.id,
          title: idea.title.rendered,
          categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
          slug: idea.slug,
          descriptionText: idea.acf.description,
          date: idea.date,
          image:
            (idea._embedded['wp:featuredmedia'] &&
              idea._embedded['wp:featuredmedia'][0] &&
              idea._embedded['wp:featuredmedia'][0].source_url) ||
            '',
        })),
        content,
        categories: categories
          .map((category: CategoryAPI) => ({ categoryId: category.id, categoryName: category.name }))
          .filter((category: Category) => !category.categoryName.includes('_offer-')),
        hideSeeMore: ideas.pageCount == 1,
        tagFilter: params.tagSlug.charAt(0).toUpperCase() + params.tagSlug.slice(1),
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  } catch (error) {
    return {
      props: {
        errorCode: 500,
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  }
}
