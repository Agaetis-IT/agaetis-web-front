import { NextContext } from 'next'

import { getAllIdeas, getAllJobs, getAllWhitePapers } from '../Services/wordpressService'

const HOST = 'https://agaetis.fr'

// Add any static site routes here
const SITEMAP_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
const SITEMAP_FOOTER = `
</urlset>`

interface Props {
  done: boolean
}

export default function SiteMap() {
  return null
}

SiteMap.getInitialProps = async ({ res }: NextContext): Promise<Props> => {
  const allPages = [
    '/',
    '/agaetis',
    '/ideas',
    '/solutions',
    '/jobs',
    '/contact',
    '/faq',
    '/cookies',
    '/personal-data',
    '/sitemap.xml',
  ]
  const ideas = await getAllIdeas()
  const jobs = await getAllJobs()
  const whitepapers = await getAllWhitePapers()
  const allJobs = jobs.map((job: { slug: string }) => '/jobs/' + job.slug)
  const allWhitePapers = whitepapers.map((whitepaper: { slug: string }) => '/white-papers/' + whitepaper.slug)
  const allIdeas = ideas
    .map((idea: { slug: string }) => '/' + idea.slug)
    .filter((idea: string) => !allJobs.includes('/jobs' + idea))
    .filter((idea: string) => !allWhitePapers.includes('/white-papers' + idea))

  if (res) {
    // Replace this with a call to your own API and pass data to mapEntry in the shape it needs.
    // eg [{ _id: '1', createdAt: 'date', updatedAt: 'date' }];

    const sitemap = `${SITEMAP_HEADER}
    ${allPages.map(node => mapEntry(node))}
    ${allIdeas.map((node: string) => mapEntry(node))}
    ${allJobs.map((node: string) => mapEntry(node))}
    ${allWhitePapers.map((node: string) => mapEntry(node))}
    ${SITEMAP_FOOTER}`

    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
    res.setHeader('Content-Type', 'application/xml')
    res.statusCode = 200
    res.end(sitemap)
  }

  return {
    done: true,
  }
}

function mapEntry(node: string, priority: number = 0.5, changefreq: string = 'always') {
  return `
<url>
   <loc>${HOST}${node}</loc>
   <changefreq>${changefreq}</changefreq>
   <priority>${priority}</priority>
</url>`
}
