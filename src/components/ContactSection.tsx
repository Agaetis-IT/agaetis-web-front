import React from 'react'

import Logo from '../public/images/logo-agaetis-vert.png'
import './ContactSection.css'
import BottomNav from './BottomNav'
import { useTranslation } from 'react-i18next'
import Address from './Address'

import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function ContactSection() {
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
    <div className="bg-orange py-8 flex flex-col md:flex-row justify-center text-white text-center md:text-left">
      <div className="max-w-xxs py-4 px-16 md:px-0 md:pr-16 mx-auto md:mx-0 md:mr-8 mb-4 md:my-0 vert-line flex flex-col justify-center ">
        {
          // eslint-disable-next-line
          // @ts-ignore-next-line
          <LazyLoadImage effect="blur" src={Logo}></LazyLoadImage>
        }
      </div>

      <div className="flex flex-col justify-center">
        <h4 className="text-white my-4  mb-4 uppercase text-sm">Nos adresses</h4>
        <div className="flex flex-col md:flex-row justify-center font-thin mb-4">
          {addresses.map((address) => (
            <Address key={address.agency} {...address} />
          ))}
        </div>
        <BottomNav></BottomNav>
      </div>
    </div>
  )
}
