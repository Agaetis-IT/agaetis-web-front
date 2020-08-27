import React from 'react'
import Button from './Button'

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
          <img src={joinUs_image_desktop}></img>
        </div>
        <div className="flex flex-row justify-between  w-2/3 px-8">
          <div className="my-auto w-2/5 ">
            <h3 className="text-orange">{joinUs_agaetis_title}</h3>
            <p className="my-8 text-sm leading-normal text-justify">{joinUs_agaetis_desc}</p>
            <Button className="bg-orange text-white rounded-full text-sm font-semibold px-6 py-3 shadow-md">
              En savoir plus
            </Button>
          </div>
          <img src={joinUs_human}></img>
          <div className="my-auto w-2/5">
            <h3 className="text-orange">{joinUs_carreer_title}</h3>
            <p className="my-8 text-sm leading-normal text-justify">{joinUs_carreer_desc}</p>
            <Button className="bg-white text-orange rounded-full text-sm font-semibold px-6 py-3 shadow-md">
              Carrière
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:hidden p-4 py-8 md:p-16">
        <h3 className="text-orange">{joinUs_agaetis_title}</h3>
        <p className="my-8 text-sm leading-normal text-justify">{joinUs_agaetis_desc}</p>
        <div className="flex flex-row-reverse justify-between sm:justify-around mb-8">
          <img src={joinUs_image_mobile_1} className="h-40 w-auto"></img>
          <Button className="bg-orange text-white rounded-full text-xs sm:text-sm font-semibold px-4 sm:px-12 py-2 sm:py-3 shadow-md h-12 my-auto">
            En savoir plus
          </Button>
        </div>

        <h3 className="text-orange">{joinUs_carreer_title}</h3>
        <p className="my-8 text-sm leading-normal text-justify">{joinUs_carreer_desc}</p>
        <div className="flex flex-row justify-between sm:justify-around ">
          <img src={joinUs_image_mobile_2} className="h-40 w-auto"></img>
          <Button className="bg-white text-orange rounded-full text-xs sm:text-sm font-semibold px-4 sm:px-12 py-2 sm:py-3 shadow-md h-12 my-auto">
            Carrière
          </Button>
        </div>
      </div>
    </>
  )
}
