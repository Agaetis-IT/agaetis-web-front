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
  expertises,
}: Props) {
  return (
    <div className="p-4 md:p-12 lg:px-24 lg:p-16">
      <img
        className="h-48 block w-1/2 mx-auto md:hidden mt-4 opacity-25"
        src={expertisesImageMobile}
        title="Nos expertises"
        alt="Nos expertises"
        width={192}
        height={192}
        loading="lazy"
      />
      <h2 className="text-orange-500 text-2xl font-semibold text-center md:text-left -mt-24 mb-12 md:m-0">
        {expertisesTitle}
      </h2>
      <img
        className="hidden md:block md:mt-12"
        src={expertisesImageDesktop}
        title="Nos expertises"
        alt="Nos expertises"
        width={1550}
        height={750}
        loading="lazy"
      />
      <div className="block md:hidden">
        {expertises.map((e, index) => (
          <div key={e.title} className="flex flex-col">
            <div className="flex flex-row py-4">
              <img
                className="h-16 w-16"
                src={e.logo}
                title={e.title}
                alt={e.title}
                width={64}
                height={64}
                loading="lazy"
              />
              <div className="self-center pl-2">
                <h3 className="text-orange-500 font-bold pb-1 uppercase text-sm leading-normal">{e.title}</h3>
                <p className="text-gray-700 text-xs leading-normal font-bold italic">
                  {e.items.split(',').join(' - ')}
                </p>
              </div>
            </div>
            {index < expertises.length - 1 && <div className="h-px w-8 my-2 bg-orange-500 self-center" />}
          </div>
        ))}
      </div>
    </div>
  )
}
