import React from 'react'

import Layout from '../components/Layout'
import SoluceTab from '../components/SoluceTab'
import LogoMichelin from '../images/michelin.png'
import LogoPSF from '../images/PSF.png'
import LogoPvac from '../images/Pvac.png'
import SoluceImg from '../images/Soluces.png'
import LogoSormea from '../images/Sormea.png'
import { getSolutionsPageContent } from '../Services/wordpressService'
import DoctorIcon from '../static/icons/doctor.png'
import LaboIcon from '../static/icons/labo.png'
import PlanIcon from '../static/icons/plan.png'

import './solutions.css'

solutions.getInitialProps = async () => {
  const pageContent = await getSolutionsPageContent()
  return { pageContent }
}

export default function solutions() {
  return (
    <Layout>
      <>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span className="text-underline">Accueil</span> > <span className="text-underline">Solutions</span>
          </div>
          <h1 className="text-center text-2xl py-8">Solutions</h1>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
            atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique
            sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga
          </p>
          <SoluceTab />
          <img className="mt-4 shadow-xl" src={SoluceImg} />
          <div>
            <h2 className="text-2xl font-semibold py-8 text-center">Pourquoi nous ?</h2>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="md:w-1/3 p-2 flex flex-col align-middle">
                <img className="w-24 h-24 mx-auto text-center mb-4" src={DoctorIcon} />
                <div>
                  <h3 className="text-lg uppercase text-center">expertise</h3>
                  <p className="text-xs leading-normal text-center py-2">avérée avec des docteurs</p>
                </div>
              </div>
              <div className="md:w-1/3 p-2 flex flex-col align-middle">
                <img className="w-24 h-24 mx-auto mb-4" src={LaboIcon} />
                <div>
                  <h3 className="text-lg uppercase text-center">Liens</h3>
                  <p className="text-xs leading-normal text-center py-2">avec de nombreux laboratoires de recherche</p>
                </div>
              </div>
              <div className="md:w-1/3 p-2 flex flex-col align-middle">
                <img className="w-24 h-24 mx-auto mb-4" src={PlanIcon} />
                <div>
                  <h3 className="text-lg uppercase text-center">co-construction</h3>
                  <p className="text-xs leading-normal text-center py-2">
                    Nous mettons en avant une démarche de co-construction avec nos clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-grey blue-underline p-8 my-4">
          <h2 className="text-2xl font-semibold text-center">Ils nous font déjà confiance</h2>
          <div className="flex flex-row flex-wrap justify-center p-4">
            <img className="p-4 logoPVAC" src={LogoPvac} />
            <img className="p-4 logoMich" src={LogoMichelin} />
            <img className="p-4 logoPSF" src={LogoPSF} />
            <img className="p-4 logoSormea" src={LogoSormea} />
          </div>
        </div>
      </>
    </Layout>
  )
}
