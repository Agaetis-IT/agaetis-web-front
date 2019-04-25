import React from 'react'

import Address from './Address'
import Button from './Button'

const addresses = [
  { agency: 'Clermont', address: '9, allée Evariste Galois', zipcode: '63170', city: 'Aubière', tel: '04 73 35 47 51' },
  { agency: 'Paris', address: '21, rue de la banque', zipcode: '75002', city: 'Paris', tel: '01 44 63 53 13' },
  { agency: 'Lyon', address: '52, Quai Rambaud', zipcode: '69002', city: 'Lyon', tel: '' },
]

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="p-4">
          <h2 className="text-xs">Nos adresses</h2>
          <div className="flex flex-col md:flex-row mt-4">
            {addresses.map(address => (
              <Address key={address.agency} {...address} />
            ))}
          </div>
        </div>
        <div className="p-4 pt-0 md:p-4">
          <h2 className="text-xs">Suivez-nous</h2>
          <div className="flex flex-row my-4">
            <Button href="#">
              <img src={require('../static/icons/facebook.png')} />
            </Button>
            <Button href="#">
              <img src={require('../static/icons/linkedin.png')} />
            </Button>
            <Button href="#">
              <img src={require('../static/icons/twitter.png')} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
