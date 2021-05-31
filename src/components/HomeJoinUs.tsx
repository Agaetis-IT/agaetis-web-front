import React from 'react'
import Button from './Button'
import Image from 'next/image'

interface Props {
  joinUs_image_desktop: string
  joinUs_image_mobile_1: string
  joinUs_image_mobile_2: string
  joinUs_human: string
  joinUs_agaetis_title: string
  joinUs_agaetis_desc: string
  joinUs_carreer_title: string
  joinUs_carreer_desc: string
}

/* eslint-disable @typescript-eslint/camelcase */
export default function HomeJoinUs({
  joinUs_image_desktop,
  joinUs_image_mobile_1,
  joinUs_image_mobile_2,
  joinUs_human,
  joinUs_agaetis_title,
  joinUs_agaetis_desc,
  joinUs_carreer_title,
  joinUs_carreer_desc,
}: Props) {
  return (
    <>
      <div className="hidden py-8 md:p-16 xl:px-32 lg:flex flex-row">
        <div className="my-auto w-1/3">
          <Image src={joinUs_image_desktop} width={559} height={443} quality={100}/>
        </div>
        <div className="relative w-2/3">
          <div className="absolute top-0 left-0 right-0 bottom-0 z-back">
            <Image src={joinUs_human} layout="fill" objectFit="contain" quality={100}/>
          </div>
          <div className="flex flex-row justify-between py-32 px-8">
            <div className="my-auto w-2/5 pr-8">
              <h3 className="text-black text-2xl leading-normal">{joinUs_agaetis_title}</h3>
              <p className="my-8 text-sm leading-normal text-justify">{joinUs_agaetis_desc}</p>
              <Button
                href="/agaetis"
                className="bg-orange-500 text-white rounded-full text-sm leading-normal font-semibold px-6 py-3 shadow-md"
              >
                En savoir plus
              </Button>
            </div>

            <div className="my-auto w-2/5 pl-8">
              <h3 className="text-black text-2xl leading-normal">{joinUs_carreer_title}</h3>
              <p className="my-8 text-sm leading-normal text-justify">{joinUs_carreer_desc}</p>
              <Button
                href="/jobs"
                className="bg-white text-orange-500 rounded-full text-sm leading-normal font-semibold px-6 py-3 shadow-md"
              >
                Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:hidden p-4 py-8 md:p-16">
        <h3 className="text-orange-500">{joinUs_agaetis_title}</h3>
        <p className="my-8 text-sm leading-normal text-justify">{joinUs_agaetis_desc}</p>
        <div className="flex flex-row-reverse justify-between sm:justify-around mb-8">
          {
            <Image src={joinUs_image_mobile_1} className="h-40 w-auto" width={321} height={321} quality={100}/>
          }
          <Button
            href="/agaetis"
            className="bg-orange-500 text-white rounded-full text-xs sm:text-sm leading-normal font-semibold px-4 sm:px-12 py-2 sm:py-3 shadow-md h-12 flex flex-col justify-center my-auto"
          >
            En savoir plus
          </Button>
        </div>

        <h3 className="text-orange-500">{joinUs_carreer_title}</h3>
        <p className="my-8 text-sm leading-normal text-justify">{joinUs_carreer_desc}</p>
        <div className="flex flex-row justify-between sm:justify-around">
          {
            <Image src={joinUs_image_mobile_2} className="h-40 w-auto" width={360} height={360} quality={100}/>
          }
          <Button
            href="/jobs"
            className="bg-white text-orange-500 rounded-full text-xs sm:text-sm leading-normal font-semibold px-4 sm:px-12 py-2 sm:py-3 shadow-md h-12 flex flex-col justify-center my-auto"
          >
            Jobs
          </Button>
        </div>
      </div>
    </>
  )
}
