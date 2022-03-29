import Button from './Button'

import { JoinUs } from '../models/IndexAPI'

interface Props {
  joinUs: JoinUs
}

export default function HomeJoinUs({ joinUs }: Props) {
  return (
    <>
      <div className="hidden p-16 lg:px-24 lg:p-16 md:flex flex-row">
        <img
          className="my-auto w-1/3"
          src={joinUs.desktopImage}
          title="Rejoignez-nous !"
          alt="Rejoignez-nous !"
          width={560}
          height={445}
          loading="lazy"
        />
        <div
          style={{
            backgroundImage: `url("${joinUs.humanImage}")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="w-2/3"
        >
          <div className="flex flex-row justify-between py-32 px-8">
            <div className="w-2/5 pr-8">
              <h2 className="text-black text-2xl leading-normal">{joinUs.title}</h2>
              <p className="my-8 text-sm leading-normal text-justify">{joinUs.description}</p>
              <Button
                href="/agaetis"
                className="flex flex-row bg-orange-500 hover:bg-orange-400 text-white rounded-full text-xs leading-normal justify-center font-semibold uppercase px-6 py-2 shadow-md h-fit w-48 hover:shadow-lg transition-all duration-250"
              >
                En savoir plus
              </Button>
            </div>
            <div className="w-2/5 pl-8">
              <h2 className="text-black text-2xl leading-normal">{joinUs.careerTitle}</h2>
              <p className="my-8 text-sm leading-normal text-justify">{joinUs.careerDescription}</p>
              <Button
                href="/jobs"
                className="flex flex-row justify-center bg-white hover:bg-gray-200 text-orange-500 uppercase rounded-full leading-normal px-6 py-2 shadow-md font-semibold text-xs h-fit w-48 hover:shadow-lg transition-all duration-250"
              >
                Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:hidden p-4">
        <h2 className="text-orange-500 font-bold text-2xl text-center mt-2 mb-6">{joinUs.title}</h2>
        <p className="mb-8 text-sm leading-normal text-justify">{joinUs.description}</p>
        <div className="flex flex-row-reverse justify-between sm:justify-around mb-8">
          <img
            className="h-32 w-32"
            src={joinUs.rightMobileImage}
            title="Rejoignez-nous !"
            alt="Rejoignez-nous !"
            width={320}
            height={320}
            loading="lazy"
          />
          <Button
            href="/agaetis"
            className="flex flex-row justify-center bg-orange-500 hover:bg-orange-400 text-white uppercase rounded-full leading-normal px-6 py-2 shadow-md font-semibold text-xs h-fit my-auto w-40 sm:w-48 hover:shadow-lg transition-all duration-250"
          >
            En savoir plus
          </Button>
        </div>
        <h2 className="text-orange-500 font-bold text-2xl text-center mt-2 mb-6">{joinUs.careerTitle}</h2>
        <p className="mb-8 text-sm leading-normal text-justify">{joinUs.careerDescription}</p>
        <div className="flex flex-row justify-between sm:justify-around mb-8">
          <img
            className="h-32 w-32"
            src={joinUs.leftMobileImage}
            title="Rejoignez-nous !"
            alt="Rejoignez-nous !"
            width={360}
            height={360}
            loading="lazy"
          />
          <Button
            href="/jobs"
            className="bg-white hover:bg-gray-200 text-orange-500 rounded-full text-xs uppercase leading-normal font-semibold px-6 py-2 shadow-md flex flex-row justify-center h-fit my-auto w-40 sm:w-48 hover:shadow-lg transition-all duration-250"
          >
            Jobs
          </Button>
        </div>
      </div>
    </>
  )
}
