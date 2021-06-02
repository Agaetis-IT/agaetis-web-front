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
        image: idea.acf.idea_image,
      })),
      author: {
        id: author.id,
        name: author.name,
        descriptionText: author.description,
        avatar: author.avatar_urls['96'],
        linkedInLink: author.url,
      },
      content,
      errorCode: author === undefined,
      hasMore: posts.pageCount > 1,
    },
  }
}

export default Author
