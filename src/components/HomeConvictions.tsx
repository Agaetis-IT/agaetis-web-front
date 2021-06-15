import clsx from 'clsx'
import Image from 'next/image'
import { Conviction } from '../types/IndexContent'

interface Props {
  title: string
  convictions: Conviction[]
}

export default function HomeConvictions({ title, convictions }: Props) {
  return (
    <div className="bg-orange-500 p-4 md:p-16 lg:px-24 lg:p-16 shadow-md">
      <h2 className="mb-6 mt-2 md:my-0 text-white text-center text-2xl font-bold md:text-left">{title}</h2>
      <div className="flex flex-col md:flex-row justify-center md:justify-start flex-nowrap md:flex-wrap text-white mb-0 mt-8 md:my-8 lg:my-0">
        {convictions.map((conviction, index) => (
          <div
            key={conviction.title}
            className={clsx(
              'flex lg:py-8 lg:my-8 w-full md:w-1/2 text-left justify-between md:justify-start my-6',
              index % 2 === 0
                ? 'flex-row lg:pr-8 xl:pr-16'
                : 'flex-row-reverse md:flex-row lg:pl-8 xl:pl-16 pr-0'
            )}
          >
            <div className="md:m-0 w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
              <Image src={conviction.image} width={113} height={113} quality={100} alt=""/>
            </div>
            <span className={clsx(index % 2 === 0 ? 'pl-4' : 'pr-4', 'flex flex-col justify-center md:px-8')}>
              <h3 className="uppercase font-semibold mb-2 md:mb-4 text-base leading-normal">{conviction.title}</h3>
              <p className="text-xs md:text-sm leading-tight">{conviction.desc}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
