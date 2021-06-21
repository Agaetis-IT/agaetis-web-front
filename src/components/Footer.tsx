const Facebook = '/icons/facebook.png'
const Linkedin = '/icons/linkedin.png'
const Twitter = '/icons/twitter.png'

import Button from './Button'

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="flex flex-col md:flex-row justify-center text-center md:text-left">
        <div className="p-4 py-0 md:py-4 md:px-0">
          <h2 className="text-xs leading-normal">Suivez-nous</h2>
          <div className="flex flex-row my-4 justify-center md:justify-start">
            <Button href="https://fr-fr.facebook.com/AgaetisIT" className="mr-4 w-4">
              <img src={Facebook} alt="facebook" />
            </Button>
            <Button href="https://www.linkedin.com/company/agaetis/" className="mr-4 w-4">
              <img src={Linkedin} alt="linkedin" />
            </Button>
            <Button href="https://twitter.com/agaetisit" className="w-4">
              <img src={Twitter} alt="twitter" />
            </Button>
          </div>
        </div>
      </div>
      <div className="text-xss leading-normal text-center opacity-25 pt-2">©AGAETIS - Tous droits réservés</div>
    </footer>
  )
}
