import BottomNav from './BottomNav'
import Address from './Address'
const Logo = '/images/logo-agaetis-vert.png'

export default function ContactSection() {
  const addresses = [
    {
      agency: "Clermont-Ferrand",
      address: "9, allée Evariste Galois",
      zipcode: "63170",
      city: "Aubière",
      tel: "04 73 35 47 51",
    },
    {
      agency: "Paris",
      address: "21, rue de la banque",
      zipcode: "75002",
      city: "Paris",
      tel: "01 44 63 53 13",
    },
    {
      agency: "Lyon",
      address: "52, Quai Rambaud",
      zipcode: "69002",
      city: "Lyon",
      tel: "",
    },
  ]

  return (
    <div className="bg-orange-500 py-8 flex flex-col md:flex-row justify-center text-white text-center md:text-left">
      <img className="max-w-xxs py-4 px-16 md:px-0 md:pr-16 mx-auto md:mx-0 md:mr-8 mb-4 md:my-0 border-white border-solid border-b md:border-b-0 md:border-r flex flex-col justify-center" src={Logo} alt="Logo"/>
      <div className="flex flex-col justify-center">
        <h4 className="text-white my-4 mb-4 uppercase text-sm leading-normal">Nos adresses</h4>
        <div className="flex flex-col md:flex-row justify-center font-extralight mb-4">
          {addresses.map((address) => (
            <Address key={address.agency} {...address} />
          ))}
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
