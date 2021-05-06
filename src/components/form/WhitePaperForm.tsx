import clsx from 'clsx'
import { Form, Formik } from 'formik'
import React, { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import publicRuntimeConfig from '../../config/env.config'
import { WhitepaperFormValues, whitePaperInitialValues, whitePaperSchema } from '../../yup/WhitePaperFormValidation'
import Button from '../Button'
import LoadingSpinner from '../LoadingSpinner'

import Checkbox from './Checkbox'
import TextField from './TextField'

interface Props {
  title: string
  file: string
  className?: string
  isLoading: boolean
  handleNextStep(values: WhitepaperFormValues, title: string, file: string, token: string): void
}

export default function WhitePaperForm({ title, file, className, handleNextStep, isLoading }: Props) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  return (
    <Formik
      initialValues={whitePaperInitialValues}
      validationSchema={whitePaperSchema}
      // tslint:disable-next-line: jsx-no-lambda
      onSubmit={(values: WhitepaperFormValues) => {
        if (recaptchaRef && recaptchaRef.current && recaptchaRef.current.getValue()) {
          handleNextStep(values, title, file, recaptchaRef.current.getValue()!)
        }
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
            inputClassName="bg-light-grey"
          />
          <TextField
            name="lastName"
            placeholder="Votre nom"
            label="Nom"
            isInvalid={!!errors.lastName && !!touched.lastName}
            className="flex flex-col my-2"
            inputClassName="bg-light-grey"
          />
          <TextField
            name="email"
            placeholder="name@example.com"
            label="Email"
            isInvalid={!!errors.email && !!touched.email}
            className="flex flex-col my-2"
            inputClassName="bg-light-grey"
          />
          <TextField
            name="company"
            placeholder="Votre société"
            label="Société"
            isInvalid={!!errors.company && !!touched.company}
            className="flex flex-col my-2"
            inputClassName="bg-light-grey"
          />
          <Checkbox
            className="flex flex-col my-2"
            name="cgu"
            label="En soumettant ce formulaire et conformément à la politique de traitement des données personnelles, j'accepte
            que les informations saisies soient exploitées afin d'être contacté par les équipes d'agaetis."
          />

          <div className="flex flex-row justify-center">
            <ReCAPTCHA ref={recaptchaRef} size="normal" sitekey={publicRuntimeConfig.NEXT_APP_RECAPTCHA_KEY} />
          </div>
          <Button
            className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto see-more shadow-md"
            type="submit"
          >
            {isLoading ? (
              <div className="flex flex-row justify-center">
                <LoadingSpinner color="#ffffff" size={12} />
                Envoi en cours
              </div>
            ) : (
              'Envoyer'
            )}
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
