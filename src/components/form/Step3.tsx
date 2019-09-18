import clsx from 'clsx'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'

import { step3Schema } from '../../yup/ContactFormValidation'
import Button from '../Button'

interface Props {
  className?: string
  handleNextStep: () => void
}

export default function Step3({ className, handleNextStep }: Props) {
  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={step3Schema}
      // tslint:disable-next-line: jsx-no-lambda
      onSubmit={fields => {
        localStorage.setItem('step3', JSON.stringify(fields))
        handleNextStep()
      }}
      // tslint:disable-next-line: jsx-no-lambda
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