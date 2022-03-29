import Blog from '../../../components/Blog'

import { convertPostAPIToCardContent } from '../../../types/PostPageContent'
import { getCategories, getBlogPageContent, getPostsByTag, getTags } from '../../../services/wordpressService'
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
      [0]: posts,
      [1]: categories,
      [2]: content,
    } = await Promise.all([getPostsByTag(params.tagSlug), getCategories(), getBlogPageContent()])

    content.description = `Découvrez nos articles avec le tag #${params.tagSlug}.`

    return {
      props: {
        postsDescription: posts.data.map((post: PostAPI) => convertPostAPIToCardContent(post)),
        content,
        categories: categories.map((category: CategoryAPI) => ({
          categoryId: category.id,
          categoryName: category.name,
        })),
        hideSeeMore: posts.pageCount == 1,
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
