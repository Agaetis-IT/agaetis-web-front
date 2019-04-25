import React from 'react'

interface Agency {
  agency: string
  address: string
  zipcode: string
  city: string
  tel: string
}

export default function Address(address: Agency) {
  return (
    <div className="text-xs md:mr-12 md:pr-1 mb-4 md:mb-0">
      <b className="font-bold">{address.agency}</b>
      <br />
      {address.address}
      <br />
      {address.zipcode} {address.city}
      <br />
      {address.tel !== '' ? 'Tél. ' + address.tel : ''}
    </div>
  )
}
