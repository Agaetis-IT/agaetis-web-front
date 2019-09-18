import React from 'react'

import CategoryTab from '../components/CategoryTab'
import Layout from '../components/Layout'

export default function ideas() {
  return (
    <Layout headerProps={{ invertColors: false }}>
      <div>
        <h1 className="text-center">Idées</h1>
        <p className="md:max-w-md mx-auto text-center p-6 text-xs leading-normal">
          At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
          atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
          sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga
        </p>
        <CategoryTab />
      </div>
    </Layout>
  )
}
