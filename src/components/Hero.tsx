interface Props {
  hero: string
  quote: string
  values: string[]
  subtitle: string
}

import styles from '../styles/Hero.module.css'
const Mask = '/images/hero_mask.svg'
const Quote = '/images/quote.png'

function convertToMultiline(text: string) {
  return text.replace(/\n/g, '</br>')
}

export default function Hero({ hero, quote, values, subtitle }: Props) {
  return (
    <div
      style={{
        backgroundImage: `url("${hero ? hero : Mask}")`,
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
      className="m-0 md:h-screen md:min-h-hero bg-orange-500 flex flex-col justify-center"
    >
      <div className={`flex flex-col p-6 md:p-0 md:my-6 py-16 text-white w-full`}>
        <div className="relative pb-4 md:pb-16 text-center text-sm md:text-3xl md:mx-16">
          <img
            className="absolute w-12 h-auto -top-5 left-0 xs:left-1/5 md:w-24 md:-top-10 md:left-15/100 xxl:left-1/5"
            src={Quote}
            alt="Guillemet gauche"
            width={173}
            height={143}
            loading="eager"
          />
          <p className="inline italic">{quote}</p>
          <img
            className="absolute w-12 h-auto top-5 right-0 transform rotate-180 xs:right-1/5 xs:top-0 md:w-24 md:top-2 md:right-15/100 xl:right-1/5 xxl:right-1/4"
            src={Quote}
            alt="Guillemet droit"
            width={173}
            height={143}
            loading="eager"
          />
        </div>
        <div className="bg-white h-px mb-4 w-16 md:mb-0 md:h-0 md:bg-transparent self-center" />
        <div className="flex flex-col md:flex-row justify-center text-white md:mx-16">
          <div className="self-center md:pr-16 xl:pr-24">
            <h1 className="flex flex-row md:flex-col justify-center pb-4 md:pb-0 md:inline md:mr-auto">
              {values.map((value) => (
                <div className={`text-base md:text-6xl leading-tight font-bold ${styles.hoverEffect} px-4`} key={value}>
                  {value}
                </div>
              ))}
            </h1>
          </div>
          <div className="md:w-px md:bg-white" />
          <p
            className="text-sm md:text-lg font-extralight md:font-normal md:pl-12 xl:pl-24 md:pt-0 pt-4 leading-normal md:max-w-lg justify-center self-center text-justify"
            dangerouslySetInnerHTML={{ __html: convertToMultiline(subtitle) }}
          />
        </div>
      </div>
    </div>
  )
}
