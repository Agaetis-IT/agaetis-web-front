import React from 'react'
import Button from './Button'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface Props {
  joinUsImageDesktop: string
  joinUsImageMobile1: string
  joinUsImageMobile2: string
  joinUsHuman: string
  joinUsAgaetisTitle: string
  joinUsAgaetisDesc: string
  joinUsCarreerTitle: string
  joinUsCarreerDesc: string
}

/* eslint-disable @typescript-eslint/camelcase */
export default function HomeJoinUs({
  joinUsImageDesktop,
  joinUsImageMobile1,
  joinUsImageMobile2,
  joinUsHuman,
  joinUsAgaetisTitle,
  joinUsAgaetisDesc,
  joinUsCarreerTitle,
  joinUsCarreerDesc,
}: Props) {
  return (
    <>
      <div className="hidden p-16 lg:px-24 lg:p-16 md:flex flex-row">
        <div className="my-auto w-1/3">
          {
            // eslint-disable-next-line
            // @ts-ignore-next-line
            <LazyLoadImage effect="blur" src={joinUsImageDesktop} />
          }
        </div>
        <div
          style={{
            backgroundImage: `url("${joinUsHuman}")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="flex flex-row justify-between w-2/3 py-32 px-8"
        >
          <div className="w-2/5 pr-8">
            <h2 className="text-black text-2xl">{joinUsAgaetisTitle}</h2>
            <p className="my-8 text-sm leading-normal text-justify">{joinUsAgaetisDesc}</p>
            <Button
              href="/agaetis"
              className="flex flex-row justify-center bg-orange text-white uppercase rounded-full px-6 py-2 shadow-md font-semibold text-xs h-fit w-48"
            >
              En savoir plus
            </Button>
          </div>

          <div className="w-2/5 pl-8">
            <h2 className="text-black text-2xl">{joinUsCarreerTitle}</h2>
            <p className="my-8 text-sm leading-normal text-justify">{joinUsCarreerDesc}</p>
            <Button
              href="/jobs"
              className="flex flex-row justify-center bg-white text-orange uppercase rounded-full px-6 py-2 shadow-md font-semibold text-xs h-fit w-48"
            >
              Jobs
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:hidden p-4">
        <h2 className="text-orange text-center mt-2 mb-6">{joinUsAgaetisTitle}</h2>
        <p className="mb-8 text-sm leading-normal text-justify">{joinUsAgaetisDesc}</p>
        <div className="flex flex-row-reverse justify-between sm:justify-around mb-8">
          {
            // eslint-disable-next-line
            // @ts-ignore-next-line
            <LazyLoadImage effect="blur" src={joinUsImageMobile1} className="h-32 w-auto" />
          }
          <Button
            href="/agaetis"
            className="flex flex-row justify-center bg-orange text-white uppercase rounded-full px-6 py-2 shadow-md font-semibold text-xs h-fit my-auto w-40 sm:w-48"
          >
            En savoir plus
          </Button>
        </div>

        <h2 className="text-orange text-center mt-2 mb-6">{joinUsCarreerTitle}</h2>
        <p className="mb-8 text-sm leading-normal text-justify">{joinUsCarreerDesc}</p>
        <div className="flex flex-row justify-between sm:justify-around mb-8">
          {
            // eslint-disable-next-line
            // @ts-ignore-next-line
            <LazyLoadImage effect="blur" src={joinUsImageMobile2} className="h-32 w-auto" />
          }
          <Button
            href="/jobs"
            className="flex flex-row justify-center bg-white text-orange uppercase rounded-full px-6 py-2 shadow-md font-semibold text-xs h-fit my-auto w-40 sm:w-48"
          >
            Jobs
          </Button>
        </div>
      </div>
    </>
  )
}
