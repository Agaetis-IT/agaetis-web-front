import Image from 'next/image'

import { Expertise } from '../types/IndexContent'

interface Props {
  expertisesTitle: string
  expertisesImageDesktop: string
  expertisesImageMobile: string
  expertises: Expertise[]
}

export default function HomeExpertises({ 
  expertisesTitle, 
  expertisesImageDesktop,
  expertisesImageMobile, 
  expertises 
}: Props) {
  return (
    <div className="p-4 md:p-12 lg:px-24 lg:p-16">
      <div className="hidden md:block h-48 mt-4 opacity-25">
        <div className="relative">
          <Image src={expertisesImageMobile} width={164} height={109} layout="responsive" quality={100}/>
        </div>
      </div>
      <h2 className="text-orange-500 font-semibold text-center md:text-left -mt-24 mb-12 md:m-0">{expertisesTitle}</h2>
      <div className="hidden md:block md:mt-12">
        <Image src={expertisesImageDesktop} width={1537} height={750} layout="responsive" quality={100}/>
      </div>
      <div className="block md:hidden">
        {expertises.map((e, index) => (
          <div key={e.title} className="flex flex-col">
            <div className="flex flex-row py-4">
              <Image className="h-16 w-16" src={e.logo} width={64} height={64} layout="fixed" quality={100}/>
              <div className="self-center pl-2">
                <h3 className="text-orange-500 pb-2 uppercase text-sm leading-normal">{e.title}</h3>
                <p className="text-gray-700 text-xs leading-normal font-bold italic">{e.items.split(',').join(' - ')}</p>
              </div>
            </div>
            {index < expertises.length - 1 && <div className="h-px w-8 my-2 bg-orange-500 self-center"/>}
          </div>
        ))}
      </div>
    </div>
  )
}
