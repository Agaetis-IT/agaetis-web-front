import { FormProvider, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'

import Button from './Button'
import TextInput from './TextInput'
import { footerContactSchema, FooterFormInput } from '../yup/ContactFormValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'

interface Props {
  handleSubmit: (formValues: FooterFormInput) => void
  isSubmited: boolean
}

export default function ContactFormFooter({ handleSubmit, isSubmited }: Props) {
  const { register, watch, control, clearErrors, ...otherFormProps } = useForm<FooterFormInput>({
    mode: 'onBlur',
    resolver: yupResolver(footerContactSchema),
  })

  useEffect(() => {
    clearErrors()
  }, [clearErrors])

  return (
    <div className="bg-light-grey p-0 p-6 md:p-12 lg:px-24 lg:p-16">
      <h2 className="text-orange text-2xl mb-8">Une question, un café, un thé ? Contactez-nous</h2>
      <FormProvider register={register} watch={watch} control={control} clearErrors={clearErrors} {...otherFormProps}>
        <form onSubmit={otherFormProps.handleSubmit(handleSubmit)}>
          <div className="flex flex-col md:flex-row justify-between">
            <TextInput
              wrapperClassName="w-full md:w-1/5"
              className="appearance-none rounded-full  text-xs p-3 shadow-xl text-orange font-semibold leading-tight"
              name="lastname"
              label="Nom"
              type="input"
            ></TextInput>
            <TextInput
              wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
              className="appearance-none rounded-full  text-xs p-3 shadow-xl text-orange font-semibold leading-tight"
              name="firstname"
              label="Prénom"
              type="input"
            ></TextInput>
            <TextInput
              wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
              className="appearance-none rounded-full  text-xs p-3 shadow-xl text-orange font-semibold leading-tight"
              name="mail"
              label="Mail"
              type="input"
            ></TextInput>
            <TextInput
              wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
              className="appearance-none rounded-full  text-xs p-3 shadow-xl text-orange font-semibold leading-tight"
              name="phone"
              label="Téléphone"
              type="input"
            ></TextInput>
          </div>
          <TextInput
            wrapperClassName="my-8"
            className="appearance-none w-full text-xs p-4 shadow-xl text-orange font-semibold leading-tight  message-textarea"
            name="message"
            label="Détail de votre demande"
            type="textarea"
          ></TextInput>

          <Button
            className="block px-8 py-2 leading-none rounded-full uppercase mx-auto mt-4 md:mt-8 bg-orange text-white text-xs font-semibold"
            type="submit"
            disabled={isSubmited}
          >
            <div className="self-center">
              Valider <span className={clsx({ loading: isSubmited }, 'float-right')} />
            </div>
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
