import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from './Button'

export default function BottomNav() {
  const { t } = useTranslation()
  const links = [
    // { title: t('footer.faq'), href: '/faq' },
    // { title: t('footer.cookies'), href: '/cookies' },
    { title: t('footer.data'), href: '/personal-data' },
    { title: t('footer.sitemap'), href: '/sitemap.xml' },
  ]
  return (
    <nav className="flex flex-col md:flex-row text-center justify-center">
      {links.map(link => (
        <Button href={link.href} key={link.title} className="text-black p-2 underline md:mx-4 text-xss">
          {link.title}
        </Button>
      ))}
    </nav>
  )
}
