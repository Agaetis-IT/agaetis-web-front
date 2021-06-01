import Image from 'next/image'

import { Expertise } from '../types/IndexContent'

interface Props {
  expertisesTitle: string
  expertisesImageDesktop: string
  expertises: Expertise[]
}

export default function HomeExpertises({ expertisesTitle, expertisesImageDesktop, expertises }: Props) {
  return (
    <>
      <div className="hidden lg:block md:p-16 xl:px-32">
        <h2 className="text-orange-500 font-semibold text-center md:text-left">{expertisesTitle}</h2>
        <div className="md:my-16 relative" id="expertise-container-desktop">
          <Image src={expertisesImageDesktop} width={1537} height={750} layout="responsive" quality={100}/>
        </div>
      </div>
      <div className="block lg:hidden p-4 py-8 relative" id="expertise-container">
        <h2 className="text-orange-500 font-semibold text-center md:text-left">{expertisesTitle}</h2>
        <div className="mt-8">
          {expertises.map((e) => (
            <div key={e.title} className="flex flex-row py-4">
              <Image className="h-16 w-16" src={e.logo} width={64} height={64} layout="fixed" quality={100}/>
              <div className="text-orange-500 self-center pl-2">
                <h3 className="pb-2 uppercase text-sm leading-normal">{e.title}</h3>
                <p className="text-xs leading-normal">{e.items.split(',').join(' - ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
