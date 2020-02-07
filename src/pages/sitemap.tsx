import React from 'react'

import Layout from '../components/Layout'
import { getAllIdeas, getAllJobs, getAllWhitePapers } from '../Services/wordpressService'
import { IdeasDesc } from '../types/IdeasContent'

interface Props {
  allPages: string[]
  allIdeas: string[]
  allJobs: string[]
  allWhitePapers: string[]
}

sitemap.getInitialProps = async () => {
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
    '/sitemap',
  ]
  const ideas = await getAllIdeas()
  const jobs = await getAllJobs()
  const whitepapers = await getAllWhitePapers()
  const allJobs = jobs.map((job: { slug: string }) => '/' + job.slug)
  const allWhitePapers = whitepapers.map((whitepaper: { slug: string }) => '/' + whitepaper.slug)
  const allIdeas = ideas
    .map((idea: { slug: string }) => '/' + idea.slug)
    .filter((idea: string) => !allJobs.includes(idea))
    .filter((idea: string) => !allWhitePapers.includes(idea))

  return {
    allPages,
    allIdeas,
    allJobs,
    allWhitePapers,
  }
}

export default function sitemap({ allPages, allIdeas, allJobs, allWhitePapers }: Props) {
  return (
    <>
      <Layout>
        <div className="md:max-w-md mx-auto px-0 md:px-8">
          <ul>
            {allPages.map(page => (
              <li className="py-1" key={page}>
                {page}
              </li>
            ))}
            {allIdeas.map(idea => (
              <li className="py-1" key={idea}>
                {idea}
              </li>
            ))}
            {allJobs.map(jobs => (
              <li className="py-1" key={jobs}>
                {jobs}
              </li>
            ))}
            {allWhitePapers.map(whitepaper => (
              <li className="py-1" key={whitepaper}>
                {whitepaper}
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </>
  )
}
