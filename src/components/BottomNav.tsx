import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from './Button'

export default function BottomNav() {
  const { t } = useTranslation()
  const links = [t('footer.faq'), t('footer.cookies'), t('footer.data'), t('footer.sitemap')]
  return (
    <nav className="flex flex-col md:flex-row text-center justify-center">
      {links.map(link => (
        <Button href="#" key={link} className="text-black p-2 underline md:no-underline md:mr-8 text-xss">
          {link}
        </Button>
      ))}
    </nav>
  )
}
