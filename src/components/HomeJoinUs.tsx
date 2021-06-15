import Button from './Button'
import Image from 'next/image'

interface Props {
  joinUsImageDesktop: string
  joinUsImageMobile1: string
  joinUsImageMobile2: string
  joinUsHuman: string
  joinUsAgaetisTitle: string
  joinUsAgaetisDesc: string
  joinUsCareerTitle: string
  joinUsCareerDesc: string
}

export default function HomeJoinUs({
  joinUsImageDesktop,
  joinUsImageMobile1,
  joinUsImageMobile2,
  joinUsHuman,
  joinUsAgaetisTitle,
  joinUsAgaetisDesc,
  joinUsCareerTitle,
  joinUsCareerDesc,
}: Props) {
  return (
    <>
      <div className="hidden p-16 lg:px-24 lg:p-16 md:flex flex-row">
        <div className="my-auto w-1/3">
          <Image src={joinUsImageDesktop} width={559} height={443} quality={100} alt=""/>
        </div>
        <div className="relative w-2/3">
          <div className="absolute top-0 left-0 right-0 bottom-0 z-back">
            <Image src={joinUsHuman} layout="fill" objectFit="contain" quality={100} alt=""/>
          </div>
          <div className="flex flex-row justify-between py-32 px-8">
            <div className="w-2/5 pr-8">
              <h2 className="text-black text-2xl leading-normal">{joinUsAgaetisTitle}</h2>
              <p className="my-8 text-sm leading-normal text-justify">{joinUsAgaetisDesc}</p>
              <Button
                href="/agaetis"
                className="flex flex-row bg-orange-500 text-white rounded-full text-xs leading-normal justify-center font-semibold uppercase px-6 py-2 shadow-md h-fit w-48"
              >
                En savoir plus
              </Button>
            </div>
            <div className="w-2/5 pl-8">
              <h2 className="text-black text-2xl leading-normal">{joinUsCareerTitle}</h2>
              <p className="my-8 text-sm leading-normal text-justify">{joinUsCareerDesc}</p>
              <Button
                href="/jobs"
                className="flex flex-row justify-center bg-white text-orange-500 uppercase rounded-full leading-normal px-6 py-2 shadow-md font-semibold text-xs h-fit w-48"
              >
                Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:hidden p-4">
        <h2 className="text-orange-500 font-bold text-2xl text-center mt-2 mb-6">{joinUsAgaetisTitle}</h2>
        <p className="mb-8 text-sm leading-normal text-justify">{joinUsAgaetisDesc}</p>
        <div className="flex flex-row-reverse justify-between sm:justify-around mb-8">
          <div className="h-32 w-32">
            <Image src={joinUsImageMobile1} width={321} height={321} quality={100} alt=""/>
          </div>
          <Button
            href="/agaetis"
            className="flex flex-row justify-center bg-orange-500 text-white uppercase rounded-full leading-normal px-6 py-2 shadow-md font-semibold text-xs h-fit my-auto w-40 sm:w-48"
          >
            En savoir plus
          </Button>
        </div>
        <h2 className="text-orange-500 font-bold text-2xl text-center mt-2 mb-6">{joinUsCareerTitle}</h2>
        <p className="mb-8 text-sm leading-normal text-justify">{joinUsCareerDesc}</p>
        <div className="flex flex-row justify-between sm:justify-around mb-8">
          <div className="h-32 w-32">
            <Image src={joinUsImageMobile2} width={360} height={360} quality={100} alt=""/>
          </div>
          <Button
            href="/jobs"
            className="bg-white text-orange-500 rounded-full text-xs uppercase leading-normal font-semibold px-6 py-2 shadow-md flex flex-row justify-center h-fit my-auto w-40 sm:w-48"
          >
            Jobs
          </Button>
        </div>
      </div>
    </>
  )
}
