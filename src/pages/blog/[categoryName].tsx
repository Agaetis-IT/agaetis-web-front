import Blog from '../../components/Blog'

import { convertPostAPIToCardContent, Response } from '../../types/PostPageContent'
import { CategoryAPI, PostAPI } from '../../models/PostAPI'
import { getPostsByPage, getCategories, getBlogPageContent, getPostsByCategory } from '../../services/wordpressService'
import { slugify } from '../../services/textUtilities'

export default Blog

export async function getStaticPaths() {
  const categories = await getCategories()

  return {
    paths: categories
      .map((category: CategoryAPI) => ({
        params: {
          categoryName: slugify(category.name),
        },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    let selectedCategory = ''
    const { [0]: categories, [1]: content } = await Promise.all([getCategories(), getBlogPageContent()])
    let promiseResult: Response

    if (!params.categoryName) {
      promiseResult = await getPostsByPage()
    } else {
      const names = categories
        .map((category: CategoryAPI) => slugify(category.name))

      if (!names.includes(params.categoryName)) {
        return {
          props: {
            postsDescription: [],
            whitePapers: [],
            categories: [],
            content: null,
          },
          notFound: true,
          revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
        }
      }

      selectedCategory = categories.filter((category: CategoryAPI) => category.slug == params.categoryName)[0].slug
      promiseResult = await getPostsByCategory(selectedCategory)
    }

    return {
      props: {
        postsDescription: promiseResult.data.map((post: PostAPI) => convertPostAPIToCardContent(post)),
        content,
        categories: categories
          .map((category: CategoryAPI) => ({ categoryId: category.id, categoryName: category.name })),
        selectedCategory: selectedCategory,
        hideSeeMore: promiseResult.pageCount <= 1,
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
