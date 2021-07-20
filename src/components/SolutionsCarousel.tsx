import styles from '../styles/SolutionsCarousel.module.css'

interface Props {
  partners: {
    name: string
    image: string
  }[]
}

export default function SolutionsCarousel({ partners }: Props) {
  const partnerCarousel = partners.concat(partners.slice(0, 4))

  return (
    <div className={`${styles.carousel} overflow-hidden relative`}>
      <style>
        {`@keyframes scrolling {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * 25% * ${partners.length})); }
        }`}
      </style>
      <ul className="h-full flex" style={{ animation: `scrolling ${10 * partners.length}s linear infinite` }}>
        {partnerCarousel.map((partner) => (
          <li className="flex justify-center items-center flex-shrink-0 max-h-full w-1/4 whitespace-nowrap">
            <img key={partner.name} src={partner.image} title={partner.name} alt={partner.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}