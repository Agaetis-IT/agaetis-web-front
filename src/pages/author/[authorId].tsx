import { getAllAuthors, getAuthorById, getAuthorPageContent, getIdeasByAuthor } from '../../services/wordpressService'
import { PostAPI } from '../../models/IdeasAPI'

import Author from '../../components/Author'
import { AuthorAPI } from '../../types/AuthorContent'

export async function getStaticPaths() {
  const authors = await getAllAuthors()

  return {
    paths: authors.map((author: AuthorAPI) => ({
      params: {
        authorId: author.id.toString()
      }
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    const { [0]: author, [1]: content, [2]: posts } = await Promise.all([
      getAuthorById(params.authorId),
      getAuthorPageContent(),
      getIdeasByAuthor(params.authorId),
    ])
    
    return {
      props: {
        ideasDescription: posts.data.map((idea: PostAPI) => ({
          id: idea.id,
          title: idea.title.rendered,
          tags: [],
          slug: idea.slug,
          descriptionText: idea.acf.idea_description,
          date: idea.date,
          image:
            (idea._embedded['wp:featuredmedia'] &&
              idea._embedded['wp:featuredmedia'][0] &&
              idea._embedded['wp:featuredmedia'][0].source_url) ||
            '',
        })),
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
      revalidate: +(process.env.NEXT_PUBLIC_REVALIDATION_DELAY),
    }
  }
  catch {
    return {
      notFound: true,
      revalidate: +(process.env.NEXT_PUBLIC_REVALIDATION_DELAY),
    }
  }
}

export default Author
