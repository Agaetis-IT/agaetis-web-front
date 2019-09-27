import React from 'react'

import Button from '../components/Button'
import Layout from '../components/Layout'
import OfferCard from '../components/OfferCard'
import OfferSection from '../components/OfferSection'

const offers = [
  {
    index: 0,
    title: 'Intitulé du poste #1',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    index: 1,
    title: 'Intitulé du poste #2',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    index: 2,
    title: 'Intitulé du poste #3',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
]

export default function job() {
  return (
    <Layout>
      <>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span className="text-underline">Accueil</span> >{' '}
            <span className="text-underline">Intitulé du poste #1</span>
          </div>
          <h1 className="text-center text-2xl py-8">Intitulé du poste #1</h1>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
            atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
            sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga
          </p>
        </div>
        <div className="bg-black mt-8 md:mt-0 md:mx-8 p-12">
          <Button className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto ">
            Postuler
          </Button>
        </div>
        <div className="w-full md:max-w-md mx-auto p-8 text-xs leading-normal text-justify">
          <p className="mb-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo ab laboriosam exercitationem, commodi,
            odio, similique facilis doloremque eligendi quos officiis in fuga nihil? Doloremque exercitationem doloribus
            aliquam est ut quam.
          </p>
          <ul>
            <li className="mb-3">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum
            </li>
            <li className="mb-3">Sed ut perspiciatis unde omnis iste error sit voluptatem</li>
            <li className="mb-3">Accusantium doloremque laudantium, totam rem aperiam</li>
            <li className="mb-3">Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae</li>
            <li className="mb-3">Vitae dicta sunt explicabo</li>
            <li className="mb-3">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores eos qui ratione voluptatem sequi nesciunt.
            </li>
          </ul>
          <p className="mb-3">
            Necesse est, non satis politus iis artibus quas qui tenent, eruditi appellantur aut ne deterruisset alios a
            studiis. quamquam te quidem video minime esse deterritum. Haec igitur Epicuri non probo.
          </p>
          <p className="mb-8">
            Inquam. De cetero vellem equidem aut ipse doctrinis fuisset instructior est enim, quod tibi ita videri
            necesse est, non satis politus iis artibus, quas qui tenent, eruditi appellantur aut ne deterruisset alios a
            studii, quamquam te quidem video minime esse deterritum.
          </p>
          <Button className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto ">
            Postuler
          </Button>
        </div>
        <div className="flex flex-col bg-grey py-12 px-4 md:p-12 mt-8">
          <h2 className="text-center mb-8" dangerouslySetInnerHTML={{ __html: 'Nos offres' }} />
          <div className="flex flex-col">
            {offers.map(offer => (
              <OfferCard
                key={offer.index}
                title={offer.title}
                description={offer.description}
                href="/job"
                className="bg-white md:max-w-md p-4 my-2 self-center"
              />
            ))}
          </div>
          <Button className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto mt-4">
            Voir plus d'offres
          </Button>
        </div>
        <OfferSection />
      </>
    </Layout>
  )
}
