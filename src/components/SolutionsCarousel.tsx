import styles from '../styles/SolutionsCarousel.module.css'

interface Props {
  partners: {
    name: string
    image: string
  }[]
}

export default function SolutionsCarousel({ partners }: Props) {
  const partnerCarousel = partners.concat(partners)

  return (
    <div className={`${styles.carousel} overflow-hidden relative`}>
      <style>
        {`@keyframes scrolling {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * 256px * ${partners.length})); }
        }`}
      </style>
      <ul className="h-full flex" style={{ animation: `scrolling ${10 * partners.length}s linear infinite` }}>
        {partnerCarousel.map((partner, index) => (
          <li key={index} className="flex justify-center items-center flex-shrink-0 max-h-full w-64 whitespace-nowrap">
            <img
              className="h-25 object-contain"
              width={160}
              height={100}
              key={partner.name}
              src={partner.image}
              title={partner.name}
              alt={partner.name}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
