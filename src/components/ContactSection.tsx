import Link from 'next/link'
import React from 'react'

import Button from './Button'
import './Common.css'

export default function ContactSection() {
  return (
    <div className="bg-orange p-8 pt-12 md:pb-14 md:pt-20 flex flex-col md:flex-row justify-center text-white text-center md:text-left blue-underline mb-4">
      <h2 className="text-2xl">Contact</h2>
      <div className="md:ml-10 mt-8 md:mt-0">
        <p className="max-w-xs text-xs leading-normal">
          Pour toute demande de renseignements, n'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs
          délais.
        </p>
        <Link href="#">
          <Button
            href="#"
            className="px-6 py-2 leading-none rounded-full uppercase mt-4 bg-dark-blue text-white text-xss font-semibold inline-block"
          >
            En savoir plus
          </Button>
        </Link>
      </div>
    </div>
  )
}
