interface Props {
  title: string
  description: string
}

export default function AgaetisDialog({ title, description }: Props) {
  return (
    <div className="justify-between flex flex-col">
      <div className="rounded-3xl rounded-bl-none bg-white shadow-md p-4 md:p-8 mb-8 w-fit max-w-4/5">
        <h2 className="font-bold text-lg text-black">{title}</h2>
      </div>
      <div className="rounded-3xl rounded-br-none bg-orange-500 shadow-md p-4 md:p-8 mb-8 max-w-4/5 self-end">
        <p className="text-sm leading-normal text-justify text-white">{description}</p>
      </div>
    </div>
  )
}
