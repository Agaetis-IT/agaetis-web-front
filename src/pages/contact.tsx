import React from 'react'

import Layout from '../components/Layout'
export default function contact() {
  return (
    <Layout headerProps={{ invertColors: false }}>
      <div>
        <h1 className="text-center">Contact</h1>
        <p className="md:max-w-md mx-auto text-center p-6 text-xs leading-normal">
          At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
          atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
          sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga
        </p>
      </div>
    </Layout>
  )
}
