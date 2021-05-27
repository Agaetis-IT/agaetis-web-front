import { NextPageContext } from 'next'
import { getAuthorById, getAuthorPageContent, getIdeasByAuthor } from '../../services/wordpressService'
import { PostAPI } from '../../models/IdeasAPI'

import Author from '../../components/Author'

interface Context extends NextPageContext {
  query: { authorId: string }
}

export async function getServerSideProps({ query }: Context) {
  const { [0]: author, [1]: content, [2]: posts } = await Promise.all([
    getAuthorById(query.authorId),
    getAuthorPageContent(),
    getIdeasByAuthor(query.authorId),
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
