interface Props {
  hero: string
  values: string[]
  subtitle: string
}

const Mask = '/images/hero_mask.svg'
const Quote = '/images/quote.png'

import styles from '../styles/Hero.module.css'

function convertToMultiline(text: string) {
  return text.replace(/\n/g, '</br>')
}

export default function Hero({ hero, values, subtitle }: Props) {
  return (
    <div
      style={{
        backgroundImage: `url("${hero ? hero : Mask}")`,
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
      className="m-0 md:h-screen md:min-h-hero bg-orange-500"
    >
      <div className="flex justify-center">
        <div className={`flex flex-col p-6 md:p-0 md:my-6 py-16 ${styles.heroText} text-white w-full`}>
          <div className="pb-4 md:pb-16 text-center text-sm md:text-3xl mx-16">
            <img className={`${styles.quoteL}`} src={Quote} alt="" />
            <p className="inline italic" id="hero-quote">
              La data au service des hommes et du monde de demain !
            </p>
            <img className={`${styles.quoteR}`} src={Quote} alt="" />
          </div>
          <div className="bg-white h-px mb-4 w-16 md:mb-0 md:h-0 md:bg-transparent self-center" />
          <div className={`flex flex-col md:flex-row justify-center text-white md:mx-16 ${styles.heroTextValeurs}`}>
            <div className="self-center md:pr-16 xl:pr-24">
              <h1 className="flex flex-row md:flex-col justify-center pb-4 md:pb-0 md:inline md:mr-auto">
                {values.map((value) => (
                  <div
                    className={`text-base md:text-6xl leading-tight font-bold ${styles.hoverEffect} px-4`}
                    key={value}
                  >
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
    </div>
  )
}
