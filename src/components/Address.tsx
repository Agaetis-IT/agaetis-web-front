import React from 'react'

interface Props {
  agency: string
  address: string
  zipcode: string
  city: string
  tel: string
}

export default function Address({ agency, address, zipcode, city, tel }: Props) {
  return (
    <div className="text-xs md:mr-12 md:pr-1 mb-4 md:mb-0">
      <b className="font-bold">{agency}</b>
      <br />
      {address}
      <br />
      {zipcode} {city}
      <br />
      {tel !== '' ? 'Tél. ' + tel : ''}
    </div>
  )
}
