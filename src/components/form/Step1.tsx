import clsx from 'clsx'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { step1Schema } from '../../yup/ContactFormValidation'
import Button from '../Button'

interface Props {
  className?: string
  handleNextStep: () => void
}

export default function Step1({ className, handleNextStep }: Props) {
  return (
    <Formik
      initialValues={{
        objet: '',
      }}
      validationSchema={step1Schema}
      // tslint:disable-next-line: jsx-no-lambda
      onSubmit={fields => {
        localStorage.setItem('step1', JSON.stringify(fields))
        handleNextStep()
      }}
      // tslint:disable-next-line: jsx-no-lambda
      render={() => (
        <Form className={clsx(className, 'justify-center mt-4')}>
          <div className="flex flex-col md:flex-row justify-center">
            <div className={clsx('my-2 md:m-0')}>
              <Field component="input" type="radio" name="objet" id="radio1" value="Un projet ?" className="hidden" />

              <Button
                className="border bg-transparent border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                htmlFor="radio1"
              >
                Un projet ?
              </Button>
            </div>

            <div className={clsx('my-2 md:m-0')}>
              <Field
                component="input"
                type="radio"
                name="objet"
                id="radio2"
                value="Une candidature ?"
                className="hidden"
              />
              <Button
                className="border border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                htmlFor="radio2"
              >
                Une candidature ?
              </Button>
            </div>
            <div className={clsx('my-2 md:m-0')}>
              <Field component="input" type="radio" name="objet" id="radio3" value="Un cafe ?" className="hidden" />
              <Button
                className="border border-blue rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer text-blue font-semibold text-xss uppercase radio"
                htmlFor="radio3"
              >
                Un café ?
              </Button>
            </div>
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
