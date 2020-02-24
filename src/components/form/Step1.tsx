import clsx from 'clsx'
import { ErrorMessage, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

import { newReactGACustomVar, newReactGAEvent } from '../../analytics/analytics'
import FormValues from '../../types/ContactFormValues'
import { Step1FormValues, step1InitialValues, step1Schema } from '../../yup/ContactFormValidation'
import Button from '../Button'

import Radio from './Radio'

interface Props {
  className?: string
  handleNextStep: (values: FormValues) => void
  formValues: FormValues
}

function onSubmit(fields: Step1FormValues, handleNext: (values: FormValues) => void, formValues: FormValues) {
  const cookies = localStorage.getItem('cookies')
  if (!cookies || JSON.parse(cookies)) {
    localStorage.setItem('step1', JSON.stringify(fields))
    newReactGAEvent('ContactFormState', 'Start form', 'Started')
    newReactGAEvent('ContactSubject', 'Subject', fields.objet)
    newReactGACustomVar(1, 'Started')
    newReactGACustomVar(2, fields.objet)
  }
  handleNext({ ...formValues, ...fields })
}

export default function Step1({ className, handleNextStep, formValues }: Props) {
  const [step1FormValues, setStep1FormValues] = useState(step1InitialValues)
  useEffect(() => {
    const cookies = localStorage.getItem('cookies')
    if (cookies) {
      setStep1FormValues(JSON.parse(cookies))
    }
  }, [step1FormValues])

  return (
    <Formik
      initialValues={formValues}
      validationSchema={step1Schema}
      onSubmit={fields => onSubmit(fields!, handleNextStep, formValues)}
      render={({ values }) => (
        <Form className={clsx(className, 'justify-center mt-4')}>
          <div className="flex flex-col md:flex-row justify-center">
            <Radio
              isSelected={values.objet === 'Un projet ?'}
              className="my-2 md:m-0"
              name="objet"
              id="radio1"
              value="Un projet ?"
              label="Un projet ?"
            />
            <Radio
              isSelected={values.objet === 'Une candidature ?'}
              className="my-2 md:m-0"
              name="objet"
              id="radio2"
              value="Une candidature ?"
              label="Une candidature ?"
            />
            <Radio
              isSelected={values.objet === 'Un cafe ?'}
              className="my-2 md:m-0"
              name="objet"
              id="radio3"
              value="Un cafe ?"
              label="Un café ?"
            />
          </div>
          <ErrorMessage name="objet" component="div" className="text-cgu text-center py-4 font-semibold text-red" />
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
