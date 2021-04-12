import Ideas from '../components/Ideas'
import { getIdeasByPage, getCategories, getIdeasPageContent, getAllWhitePapers } from '../Services/wordpressService'
import WhitePaper from '../types/WhitePaper'

export async function getServerSideProps() {
  const { [0]: ideas, [1]: categories, [2]: content, [3]: whitepapers } = await Promise.all([
    getIdeasByPage(0),
    getCategories(),
    getIdeasPageContent(),
    getAllWhitePapers(),
  ])

  return {
    props: {
      ideasDescription: ideas.map((idea: any) => ({
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
        .map((category: any) => ({ categoryId: category.id, categoryName: category.name }))
        .filter((category: any) => !category.categoryName.includes('_offer-')),
    },
  }
}

export default Ideas
