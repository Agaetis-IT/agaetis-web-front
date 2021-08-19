import Blog from '../components/Blog'

import { CategoryAPI, PostAPI } from '../models/PostAPI'
import { convertPostAPIToCardContent } from '../types/PostPageContent'
import { getPostsByPage, getCategories, getBlogPageContent } from '../services/wordpressService'

export default Blog

export async function getStaticProps() {
  try {
    const {
      [0]: posts,
      [1]: categories,
      [2]: content,
    } = await Promise.all([getPostsByPage(), getCategories(), getBlogPageContent()])

    return {
      props: {
        postsDescription: posts.data.map((post: PostAPI) => convertPostAPIToCardContent(post)),
        content,
        categories: categories
          .map((category: CategoryAPI) => ({ categoryId: category.id, categoryName: category.name })),
        hideSeeMore: posts.pageCount == 1,
        tagFilter: null,
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
