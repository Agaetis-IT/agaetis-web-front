import Link from 'next/link'
import React from 'react'

import Button from './Button'

interface Props {
  footerText: string
}

export default function OfferSection({ footerText }: Props) {
  return (
    <div className="bg-orange p-8 pt-12 md:pb-20 md:pt-24 flex flex-col md:flex-row justify-center text-white text-center md:text-left blue-underline">
      <h3 className="text-2xl self-center m-0 md:pb-2">
        Candidature
        <br /> spontanée
      </h3>
      <div className="md:ml-10 mt-8 md:mt-0">
        <p className="max-w-xs text-xs leading-normal">{footerText}</p>
        <Link href="/contact">
          <Button className="px-6 py-2 leading-none rounded-full uppercase mt-4 bg-dark-blue text-white text-xss font-semibold inline-block">
            Envoyer ma candidature
          </Button>
        </Link>
      </div>
    </div>
  )
}
