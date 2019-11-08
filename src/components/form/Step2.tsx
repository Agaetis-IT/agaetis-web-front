import clsx from 'clsx'
import { Form, Formik } from 'formik'
import React from 'react'

import step2Schema, { Step2FormValues, step2InitialValues } from '../../yup/ContactFormValidation'
import Button from '../Button'

import Checkbox from './Checkbox'
import TextField from './TextField'

interface Props {
  className?: string
  handleNextStep(): void
}

function onSubmit(fields: Step2FormValues, handleNext: () => void) {
  localStorage.setItem('step2', JSON.stringify(fields))
  handleNext()
}

export default function Step2({ className, handleNextStep }: Props) {
  return (
    <Formik
      initialValues={step2InitialValues}
      validationSchema={step2Schema}
      onSubmit={fields => {
        onSubmit(fields, handleNextStep)
      }}
      render={({ errors, touched }) => (
        <Form className={clsx(className, 'justify-center mt-4')}>
          <TextField
            name="firstName"
            placeholder="Votre prénom"
            label="Prénom"
            isInvalid={!!errors.firstName && !!touched.firstName}
            className="flex flex-col my-2"
          />
          <TextField
            name="lastName"
            placeholder="Votre nom"
            label="Nom"
            isInvalid={!!errors.lastName && !!touched.lastName}
            className="flex flex-col my-2"
          />
          <TextField
            name="email"
            placeholder="name@example.com"
            label="Email"
            isInvalid={!!errors.email && !!touched.email}
            className="flex flex-col my-2"
          />
          <TextField
            name="phone"
            placeholder="Votre téléphone"
            label="Téléphone"
            isInvalid={!!errors.phone && !!touched.phone}
            className="flex flex-col my-2"
          />
          <TextField
            name="company"
            placeholder="Votre société"
            label="Société"
            isInvalid={!!errors.company && !!touched.company}
            className="flex flex-col my-2"
          />
          <Checkbox
            className="flex flex-col my-2"
            name="cgu"
            label="En soumettant ce formulaire et conformément à la politique de traitement des données personnelles, j'accepte
            que les informations saisies soient exploitées afin d'être contacté par les équipes d'agaetis."
          />

          <Button
            type="submit"
            className="block md:inline-block px-8 py-2 leading-none rounded-full uppercase mx-auto mt-4 md:mt-8 bg-orange text-white text-xs font-semibold"
          >
            Poursuivre
          </Button>
        </Form>
      )}
    />
  )
}
