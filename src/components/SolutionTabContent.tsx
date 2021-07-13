import clsx from 'clsx'

import { compareWhyUsSection, SolutionsContent } from '../types/SolutionsContent'

interface Props {
  content: SolutionsContent
  className: string
  selected: number
}

export default function SolutionTabContent({ content, className, selected }: Props) {
  return (
    <>
      <div className="md:max-w-full mx-auto p-0 md:px-8 xl:px-32">
        <div>
          <h2 className="text-2xl leading-normal font-semibold py-8 text-center">{content.whyUs.title}</h2>
          <div className="flex flex-col sm:flex-row justify-between">
            {content.whyUs.sections.sort(compareWhyUsSection).map((section) => (
              <div key={section.index} className="sm:w-1/3 p-2 flex flex-col align-middle">
                <img className="w-24 h-24 mx-auto text-center mb-4" src={section.icon} alt={section.title} />
                <div>
                  <h3 className="text-lg font-bold leading-normal uppercase text-center">{section.title}</h3>
                  <p className="text-sm leading-normal text-center py-2">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-400 px-4 py-8 my-4">
        <h2 className="text-2xl leading-normal font-semibold text-center">{content.partnersTitle}</h2>
        <div className="flex flex-row flex-wrap justify-center p-4">
          {content.partners.map((partner) => (
            <img className="m-2" key={partner.name} src={partner.image} alt={partner.name} />
          ))}
        </div>
      </div>
    </>
  )
}
