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
    <div className="text-xs mr-12">
      <b>{address.agency}</b>
      <br />
      {address.address}
      <br />
      {address.zipcode} {address.city}
      <br />
      {address.tel}
    </div>
  )
}
