import clsx from 'clsx'

import { compareWhyUsSection, Tab } from '../types/SolutionsContent'

interface Props {
  content: Tab
  className: string
}

export default function SoluceTabContent({ content, className }: Props) {
  return (
    <>
      <div className="md:max-w-full mx-auto p-0 md:px-8 xl:px-32">
        <img className="mt-4 shadow-2xl w-full" src={content.solutions_img} alt="header image" />
        <div className={clsx(className, 'p-4')}>
          <div className={clsx('sm:w-1/2 sm:pr-4')}>
            <h2
              className="text-xl leading-normal font-semibold py-4 text-center"
              dangerouslySetInnerHTML={{ __html: content.sections[0].title }}
            />
            <p
              className="text-sm text-justify leading-normal"
              dangerouslySetInnerHTML={{ __html: content.sections[0].description }}
            />
          </div>
          <div className={clsx('sm:w-1/2 sm:pl-4')}>
            <h2
              className="text-xl leading-normal font-semibold py-4 text-center"
              dangerouslySetInnerHTML={{ __html: content.sections[1].title }}
            />
            <p
              className="text-sm text-justify leading-normal"
              dangerouslySetInnerHTML={{ __html: content.sections[1].description }}
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl leading-normal font-semibold py-8 text-center">{content.whyUs.title}</h2>
          <div className="flex flex-col sm:flex-row justify-between">
            {content.whyUs.sections.sort(compareWhyUsSection).map((section) => (
              <div key={section.index} className="sm:w-1/3 p-2 flex flex-col align-middle">
                <img className="w-24 h-24 mx-auto text-center mb-4" src={section.icon} alt="step" />
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
        <h2 className="text-2xl leading-normal font-semibold text-center">{content.partnerTitle}</h2>
        <div className="flex flex-row flex-wrap justify-center p-4">
          {content.partners.map((partner) => (
            <img className="m-2" key={partner} src={partner} alt="partenaire" />
          ))}
        </div>
      </div>
    </>
  )
}
