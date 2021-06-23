import clsx from 'clsx'

interface Props {
  className?: string
  title: string
  description: string
}

export default function AgaetisCard({ className, title, description }: Props) {
  return (
    <div className={clsx('md:my-12 justify-between p-8 mx-auto md:max-w-full', className)}>
      <h2 className="pb-4 font-bold text-2xl text-black">{title}</h2>
      <p className="text-sm leading-normal text-justify">{description}</p>
    </div>
  )
}
