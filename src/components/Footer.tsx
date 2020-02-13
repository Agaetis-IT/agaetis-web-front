import React from 'react'
import { useTranslation } from 'react-i18next'

import Facebook from '../static/icons/facebook.png'
import Linkedin from '../static/icons/linkedin.png'
import Twitter from '../static/icons/twitter.png'

import Address from './Address'
import BottomNav from './BottomNav'
import Button from './Button'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const addresses = [
    {
      agency: t('footer.clermont'),
      address: t('footer.clermont-address'),
      zipcode: t('footer.clermont-zipcode'),
      city: t('footer.clermont-city'),
      tel: t('footer.clermont-tel'),
    },
    {
      agency: t('footer.paris'),
      address: t('footer.paris-address'),
      zipcode: t('footer.paris-zipcode'),
      city: t('footer.paris-city'),
      tel: t('footer.paris-tel'),
    },
    {
      agency: t('footer.lyon'),
      address: t('footer.lyon-address'),
      zipcode: t('footer.lyon-zipcode'),
      city: t('footer.lyon-city'),
      tel: t('footer.lyon-tel'),
    },
  ]
  return (
    <footer className="py-4">
      <div className="flex flex-col md:flex-row justify-center text-center md:text-left">
        <div className="p-4 pt-0 md:p-0 md:pr-4">
          <h4 className="text-xs">{t('footer.address-title')}</h4>
          <div className="flex flex-col md:flex-row mt-4 justify-center font-thin">
            {addresses.map(address => (
              <Address key={address.agency} {...address} />
            ))}
          </div>
        </div>
        <div className="p-4 py-0 md:py-4 md:px-0">
          <h2 className="text-xs">{t('footer.social-title')}</h2>
          <div className="flex flex-row my-4 justify-center md:justify-start">
            <Button href="https://fr-fr.facebook.com/AgaetisIT" className="mr-4 w-4">
              <img src={Facebook} />
            </Button>
            <Button href="https://www.linkedin.com/company/agaetis/" className="mr-4 w-4">
              <img src={Linkedin} />
            </Button>
            <Button href="https://twitter.com/agaetisit" className="w-4">
              <img src={Twitter} />
            </Button>
          </div>
        </div>
      </div>
      <hr className="md:mt-8 Footer-separator w-full" />
      <BottomNav />
      <hr className="Footer-separator w-full" />
      <div className="text-xss text-center opacity-25 pt-2"> {t('footer.copyright')}</div>
    </footer>
  )
}
