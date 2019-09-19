import Link from 'next/link'
import React from 'react'

import Button from './Button'

export default function OfferSection() {
  return (
    <div className="bg-orange p-8 pt-12 md:pb-14 md:pt-16 flex flex-col md:flex-row justify-center text-white text-center md:text-left blue-underline mb-4">
      <h3 className="text-2xl self-center m-0 md:pb-2">
        Candidature
        <br /> spontanée
      </h3>
      <div className="md:ml-10 mt-8 md:mt-0">
        <p className="max-w-xs text-xs leading-normal">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.
        </p>
        <Link href="#">
          <Button
            href="#"
            className="px-6 py-2 leading-none rounded-full uppercase mt-4 bg-dark-blue text-white text-xss font-semibold inline-block"
          >
            Envoyer ma candidature
          </Button>
        </Link>
      </div>
    </div>
  )
}
