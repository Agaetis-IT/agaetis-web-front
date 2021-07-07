import styles from '../styles/LoadingSpinner.module.css'

interface Props {
  color: string
  size: number
}

export default function LoadingSpinner({ color, size }: Props) {
  return (
    <div className={`${styles.spinner}`}>
      <div
        className={`${styles.spinnerIcon} border-2 rounded-full container border-transparent`}
        style={{ borderTopColor: color, borderLeftColor: color, width: size, height: size }}
      />
    </div>
  )
}
