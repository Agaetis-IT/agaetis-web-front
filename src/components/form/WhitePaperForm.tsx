import clsx from 'clsx'
import { Form, Formik } from 'formik'
import React from 'react'

import { whitePaperInitialValues, whitePaperSchema } from '../../yup/WhitePaperFormValidation'
import Button from '../Button'

import Checkbox from './Checkbox'
import TextField from './TextField'

interface Props {
  className?: string
  handleNextStep(): void
}

export default function WhitePaperForm({ className, handleNextStep }: Props) {
  return (
    <Formik
      initialValues={whitePaperInitialValues}
      validationSchema={whitePaperSchema}
      // tslint:disable-next-line: jsx-no-lambda
      onSubmit={() => {
        handleNextStep()
      }}
      // tslint:disable-next-line
      render={({ errors, touched }) => (
        <Form className={clsx(className, 'justify-center mt-4')}>
          <TextField
            name="firstName"
            placeholder="Votre prénom"
            label="Prénom"
            isInvalid={!!errors.firstName && !!touched.firstName}
            className="flex flex-col my-2"
            inputClassName="bg-grey"
          />
          <TextField
            name="lastName"
            placeholder="Votre nom"
            label="Nom"
            isInvalid={!!errors.lastName && !!touched.lastName}
            className="flex flex-col my-2"
            inputClassName="bg-grey"
          />
          <TextField
            name="email"
            placeholder="name@example.com"
            label="Email"
            isInvalid={!!errors.email && !!touched.email}
            className="flex flex-col my-2"
            inputClassName="bg-grey"
          />
          <TextField
            name="company"
            placeholder="Votre société"
            label="Société"
            isInvalid={!!errors.company && !!touched.company}
            className="flex flex-col my-2"
            inputClassName="bg-grey"
          />
          <Checkbox
            className="flex flex-col my-2"
            name="cgu"
            label="En soumettant ce formulaire et conformément à la politique de traitement des données personnelles, j'accepte
            que les informations saisies soient exploitées afin d'être contacté par les équipes d'agaetis."
          />

          <Button
            type="submit"
            className="block w-64 px-8 py-3 leading-none rounded-full uppercase mx-auto mt-4 md:mt-8 bg-orange text-white text-xs font-semibold"
          >
            Télécharger
          </Button>
          <Button
            href="/ideas#whitepapers"
            className="w-64 block border text-center border-blue text-blue px-8 py-3 leading-none rounded-full uppercase mx-auto mt-4  bg-transparent text-black text-xs font-semibold"
          >
            Voir les autres livres blancs
          </Button>
        </Form>
      )}
    />
  )
}
