import React from 'react'

import Button from '../components/Button'
import CategoryTab from '../components/CategoryTab'
import '../components/Common.css'
import Layout from '../components/Layout'

const whiteBooks = [
  {
    id: 0,
    title: "Titre du livre blanc#1 qui s'affiche sur deux ou trois lignes",
    src: '',
  },
  {
    id: 1,
    title: "Titre du livre blanc#1 qui s'affiche sur deux ou trois lignes",
    src: '',
  },
  {
    id: 2,
    title: "Titre du livre blanc#1 qui s'affiche sur deux ou trois lignes",
    src: '',
  },
]

export default function Ideas() {
  return (
    <Layout headerProps={{ invertColors: false }}>
      <div className="">
        <h1 className="text-center">Idées</h1>
        <p className="md:max-w-md mx-auto text-center p-6 text-xs leading-normal">
          At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
          atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
          sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga
        </p>
        <CategoryTab />
        <Button className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto">
          Voir plus d'idées
        </Button>
        <div className="text-center w-full mx-auto p-6 bg-grey my-8 blue-underline">
          <h2 className="text-2xl mt-4">Livres blancs</h2>
          <p className="text-xs md:max-w-md md:px-20 py-4 mx-auto">
            Curabitur et elit sed orci consequat dapibus a quis justo. Maecenas ornare fermentum congue. Cras eget ante
            orci. Nullam placerat lacus quam, non eleifend ligula faucibus vitae. Quisque faucibus vitae nibh sit arnet
            faucibus. Pellentesque sed.
          </p>
          <div className="my-4 md:my-8 flex flex-col md:flex-row justify-center md:max-w-md mx-auto">
            {whiteBooks.map(whiteBook => (
              <div key={whiteBook.id} className="mb-4 md:m-0">
                <div className="bg-black-light shadow-xl md:w-ideas h-40 md:h-32 mx-auto" />
                <h3 className="text-sm px-3 py-4">{whiteBook.title}</h3>
                <Button className="rounded-full uppercase text-white text-xss md:text-cgu font-semibold bg-orange px-8 py-3 md:px-6 md:py-2">
                  Télécharger
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
