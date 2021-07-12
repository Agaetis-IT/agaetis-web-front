import Address from './Address'
import BottomNav from './BottomNav'
import Button from './Button'

const Twitter = '/icons/twitter.png'
const Linkedin = '/icons/linkedin.png'
const Facebook = '/icons/facebook.png'
const Logo = '/images/logo-agaetis-vert.png'

export default function ContactSection() {
  const addresses = [
    {
      agency: 'Clermont-Ferrand',
      address: '9, allée Evariste Galois',
      zipcode: '63170',
      city: 'Aubière',
      tel: '04 73 35 47 51',
    },
    {
      agency: 'Paris',
      address: '21, rue de la banque',
      zipcode: '75002',
      city: 'Paris',
      tel: '01 44 63 53 13',
    },
    {
      agency: 'Lyon',
      address: '52, Quai Rambaud',
      zipcode: '69002',
      city: 'Lyon',
      tel: '',
    },
  ]

  return (
    <>
      <div className="bg-orange-500 p-6 md:p-16 lg:px-32 xl:px-48 flex flex-col md:flex-row text-white text-center md:text-left">
        <img
          className="self-center object-contain max-w-xxs h-auto py-4 px-16 md:px-0 md:pr-16 md:mx-0 md:mr-8 mb-4 md:my-0 md:border-white md:border-solid md:border-r"
          src={Logo}
          alt="Logo"
        />
        <div className="flex flex-col justify-center w-full">
          <BottomNav />
          <h4 className="text-white my-4 mb-4 uppercase text-sm font-bold leading-normal">Nos adresses</h4>
          <div className="flex flex-col md:flex-row justify-between font-extralight mb-4">
            {addresses.map((address, index) => (
              <>
                {index > 0 && <div className="h-px md:hidden w-10 bg-white mb-4 self-center" />}
                <Address key={address.agency} {...address} />
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-white py-2 px-6 md:px-16 lg:px-32 xl:px-48 flex justify-center md:justify-between">
        <span className="text-cgu self-center">© {new Date().getFullYear()} Agaetis - Tous droits réservés</span>
        <div className="hidden flex-row items-center md:flex">
          <Button
            href="https://fr-fr.facebook.com/AgaetisIT"
            className="w-6 h-6 mr-4 self-center shadow-sm hover:shadow-md bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-250 p-1 text-none"
          >
            <img src={Facebook} className="w-4 h-4 filter invert" alt="Facebook" />
          </Button>
          <Button
            href="https://www.linkedin.com/company/agaetis/"
            className="w-6 h-6 mr-4 shadow-sm hover:shadow-md bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-250 p-1 text-none"
          >
            <img src={Linkedin} className="w-4 h-4 filter invert" alt="LinkedIn" />
          </Button>
          <Button
            href="https://twitter.com/agaetisit"
            className="w-6 h-6 shadow-sm hover:shadow-md bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-250 p-1 text-none"
          >
            <img src={Twitter} className="w-4 h-4 filter invert" alt="Twitter" />
          </Button>
        </div>
      </div>
    </>
  )
}
