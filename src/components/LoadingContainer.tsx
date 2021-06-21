interface Props {
  animationDuration: number
  isFinished: boolean
  children: React.ReactElement[]
}

export default function LoadingContainer({ animationDuration, isFinished, children }: Props) {
  return (
    <div
      className="pointer-events-none"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </div>
  )
}
