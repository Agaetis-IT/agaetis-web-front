import Image from 'next/image'

interface Props {
  hero: string
  valeurs: string[]
  subtitle: string
}

const Mask = '/images/hero_mask.svg'
const Quote = '/images/quote.png'

import styles from '../styles/Hero.module.css'

export default function Hero({ hero, valeurs, subtitle }: Props) {
  return (
    <div
      style={{
        backgroundImage: `url("${hero ? hero : Mask}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="m-0 md:h-screen bg-orange-500"
    >
      <div>
        <div className="flex justify-center">
          <div className={`flex flex-col p-6 md:p-0 md:my-6 py-16 ${styles.heroText} text-white w-full`}>
            <div className="pb-8 md:pb-16 text-center text-sm md:text-2xl leading-normal">
              <div className={`${styles.quoteL}`}>
                <Image src={Quote} width={214} height={692} quality={100}/>
              </div>
              <p className="inline" id="hero-quote">
                La data au service des hommes et du monde de demain !
              </p>
              <div className={`${styles.quoteR}`}>
                <Image src={Quote} width={214} height={692} quality={100}/>
              </div>
            </div>

            <div className={`flex flex-col md:flex-row justify-center text-white ${styles.heroTextValeurs}`}>
              <div className="md:pr-16 xl:pr-48">
                <h1 className="flex flex-row md:flex-col justify-center pb-4 md:pb-0 md:inline md:mr-auto">
                  {valeurs.map((valeur) => (
                    <div
                      className={`text-base md:text-6xl leading-normal font-bold ${styles.hoverEffect} px-4`}
                      key={valeur}
                    >
                      {valeur}
                    </div>
                  ))}
                </h1>
              </div>
              <p
                className="text-sm md:text-base font-extralight md:p-12 md:pr-0 pt-4 leading-normal md:max-w-sm justify-end self-end text-justify"
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
