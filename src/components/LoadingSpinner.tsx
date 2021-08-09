interface Props {
  color: string
  size: number
}

export default function LoadingSpinner({ color, size }: Props) {
  return (
    <div className="mr-1 -mb-spin">
      <div
        className="animate-spin border-2 rounded-full container border-transparent"
        style={{ borderTopColor: color, borderLeftColor: color, width: size, height: size }}
      />
    </div>
  )
}
