import clsx from 'clsx'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'

import { newReactGACustomVar, newReactGAEvent } from '../../analytics/analytics'
import FormValues from '../../types/ContactFormValues'
import { Step3FormValues, step3InitialValues, step3Schema } from '../../yup/ContactFormValidation'
import Button from '../Button'

interface Props {
  className?: string
  handleNextStep: (formValues: FormValues) => void
  formValues: FormValues
}

function onSubmit(fields: Step3FormValues, handleNext: (formValues: FormValues) => void, formValues: FormValues) {
  const cookies = localStorage.getItem('cookies')
  if (!cookies || JSON.parse(cookies)) {
    localStorage.setItem('step3', JSON.stringify(fields))
    newReactGAEvent('ContactFormState', 'Submit form', 'Done')
    newReactGACustomVar(1, 'Done')
  }
  handleNext({ ...formValues, ...fields })
}

export default function Step3({ className, handleNextStep, formValues }: Props) {
  return (
    <Formik
      initialValues={step3InitialValues}
      validationSchema={step3Schema}
      onSubmit={fields => onSubmit(fields, handleNextStep, formValues)}
      render={() => (
        <Form className={clsx(className, 'justify-center mt-4')}>
          <div className="flex flex-col justify-center">
            <div className={clsx('my-2 md:m-0')}>
              <label htmlFor="message" className="text-xs font-semibold">
                Message
              </label>
              <Field
                style={{ outline: 'none' }}
                component="textarea"
                name="message"
                placeholder="Votre message"
                id="message"
                className="text-xs my-2 w-full h-64 p-4"
              />
            </div>
            <ErrorMessage name="message" component="div" className="text-cgu py-2 font-semibold text-red" />
          </div>

          <Button
            type="submit"
            className="block md:inline-block px-8 py-2 leading-none rounded-full uppercase mx-auto mt-4 md:mt-8 bg-orange text-white text-xs font-semibold"
          >
            Valider
          </Button>
        </Form>
      )}
    />
  )
}
