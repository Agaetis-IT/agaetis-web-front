import React from 'react'
import { useTranslation } from 'react-i18next'

import './Hero.css'
export default function Hero() {
  const { t } = useTranslation()
  return (
    <div className="hero m-0">
      <div className="darkener flex justify-center">
        <div className="p-6 md:p-10 md:my-6 py-16 md:py-32 max-w-sm md:max-w-md text-white mx-auto md:pr-40 text-justify justify-fix">
          <h1 className="md:text-4xl">
            {t('index.explore')}
            <br />
            {t('index.valorize')}
            <br />
            {t('index.innovate')}
          </h1>
          <p className="text-sm md:pr-10 pt-4 leading-normal">{t('index.hero-description')}</p>
        </div>
      </div>
    </div>
  )
}
