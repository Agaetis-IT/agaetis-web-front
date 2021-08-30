import Author from '../../components/Author'

import { AuthorAPI } from '../../models/AuthorAPI'
import { convertPostAPIToCardContent } from '../../types/PostPageContent'
import { getAllAuthors, getAuthorById, getAuthorPageContent, getPostsByAuthor } from '../../services/wordpressService'
import { PostAPI } from '../../models/PostAPI'

export async function getStaticPaths() {
  const authors = await getAllAuthors()

  return {
    paths: authors.map((author: AuthorAPI) => ({
      params: {
        authorId: author.id.toString(),
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    const {
      [0]: author,
      [1]: content,
      [2]: posts,
    } = await Promise.all([getAuthorById(params.authorId), getAuthorPageContent(), getPostsByAuthor(params.authorId)])

    return {
      props: {
        postsDescription: posts.data.map((post: PostAPI) => convertPostAPIToCardContent(post)),
        author: {
          id: author.id,
          name: author.name,
          descriptionText: author.description,
          avatar: author.avatar_urls['96'],
          linkedInLink: author.url,
        },
        content,
        hasMore: posts.pageCount > 1,
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  } catch {
    return {
      notFound: true,
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  }
}

export default Author
