import Blog from '../../components/Blog'

import { Category, Response } from '../../types/PostPageContent'
import { CategoryAPI, PostAPI } from '../../models/PostAPI'
import {
  getPostsByPage,
  getCategories,
  getBlogPageContent,
  getPostsByCategory,
} from '../../services/wordpressService'
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
      }))
      .filter((path: { params: { categoryName: string } }) => !path.params.categoryName.includes('offer-')),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    let selectedCategory = ''
    const {
      [0]: categories,
      [1]: content,
    } = await Promise.all([getCategories(), getBlogPageContent()])
    let promiseResult: Response

    if (!params.categoryName) {
      promiseResult = await getPostsByPage()
    } else {
      const names = categories
        .map((category: CategoryAPI) => slugify(category.name))
        .filter((name: string) => !name.includes('_offer-'))

      if (!names.includes(params.categoryName)) {
        return {
          props: {
            ideasDescription: [],
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
        ideasDescription: promiseResult.data.map((idea: PostAPI) => ({
          id: idea.id,
          title: idea.title.rendered,
          categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
          tags: [],
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
