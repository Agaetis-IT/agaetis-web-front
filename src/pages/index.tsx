import React from 'react'

import '../styles/index.css'
export default function Index() {
  const test: string = 'Test'
  const test2 = 'Try'
  return (
    <h1 className="bg-grey-lighter">
      {test}
      {test2}
    </h1>
  )
}
