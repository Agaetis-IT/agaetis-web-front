import { FormProvider, useForm } from 'react-hook-form'
import React, { useEffect, useRef } from 'react'

import Button from './Button'
import TextInput from './TextInput'
import CheckBox from './CheckBox'
import { AttachmentContent, footerContactSchema, FormInput } from '../yup/ContactFormValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import Twitter from '../static/icons/twitter.png'
import Linkedin from '../static/icons/linkedin.png'
import Facebook from '../static/icons/facebook.png'
import Particles from '../static/images/particles-3-mirror.svg'

import './Common.css'
import ReCAPTCHA from 'react-google-recaptcha'
import publicRuntimeConfig from '../config/env.config'
import FileInput from './FileInput'
import LoadingSpinner from './LoadingSpinner'

interface Props {
  handleSubmit: (formValues: FormInput) => void
  isSubmited: boolean
  title: string
  subText?: string
}

export default function ContactForm({ title, handleSubmit, isSubmited, subText }: Props) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { register, watch, control, clearErrors, ...otherFormProps } = useForm<FormInput>({
    mode: 'onBlur',
    resolver: yupResolver(footerContactSchema),
  })

  const onCaptchaChange = (value: string | null) => {
    otherFormProps.setValue('captcha', value, { shouldValidate: true })
  }

  const onAttachmentsChange = (value: AttachmentContent[]) => {
    otherFormProps.setValue('attachments', value)
  }

  useEffect(() => {
    clearErrors()
  }, [clearErrors])

  return (
    <div
      className="bg-light-grey p-0 p-6 md:p-12 lg:px-24 lg:p-16"
      style={{
        backgroundImage: `url("${Particles}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
        backgroundSize: 'cover',
      }}
    >
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <h2 className="text-orange text-2xl mb-4 md:mb-0">{title}</h2>
        <div className="flex flex-row items-center">
          <Button
            href="https://fr-fr.facebook.com/AgaetisIT"
            className="w-6 h-6 mr-4 self-center shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
          >
            <img src={Facebook} className="w-4 h-4" />
          </Button>
          <Button
            href="https://www.linkedin.com/company/agaetis/"
            className="w-6 h-6 mr-4 shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
          >
            <img src={Linkedin} className="w-4 h-4" />
          </Button>
          <Button
            href="https://twitter.com/agaetisit"
            className="w-6 h-6 shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
          >
            <img src={Twitter} className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {subText ? (
        <div className="mb-8">
          <p className="text-sm leading-normal" dangerouslySetInnerHTML={{ __html: subText }} />
        </div>
      ) : (
        ''
      )}
      <FormProvider register={register} watch={watch} control={control} clearErrors={clearErrors} {...otherFormProps}>
        <form onSubmit={otherFormProps.handleSubmit(handleSubmit)}>
          <div className="flex flex-col md:flex-row justify-between">
            <TextInput
              wrapperClassName="w-full md:w-1/5"
              className="appearance-none rounded-full  text-xs p-3 shadow-md text-orange font-semibold leading-tight"
              name="lastname"
              label="Nom"
              type="input"
            ></TextInput>
            <TextInput
              wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
              className="appearance-none rounded-full  text-xs p-3 shadow-md text-orange font-semibold leading-tight"
              name="firstname"
              label="Prénom"
              type="input"
            ></TextInput>
            <TextInput
              wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
              className="appearance-none rounded-full  text-xs p-3 shadow-md text-orange font-semibold leading-tight"
              name="mail"
              label="Mail"
              type="input"
            ></TextInput>
            <TextInput
              wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
              className="appearance-none rounded-full  text-xs p-3 shadow-md text-orange font-semibold leading-tight"
              name="phone"
              label="Téléphone"
              type="input"
            ></TextInput>
          </div>
          <TextInput
            wrapperClassName="my-8"
            className="appearance-none rounded-full text-xs p-3 shadow-md text-orange font-semibold leading-tight"
            name="subject"
            label="Sujet de votre demande"
            type="input"
          ></TextInput>
          <TextInput
            wrapperClassName="my-8"
            className="appearance-none w-full text-xs p-3 shadow-md text-orange font-semibold leading-tight message-textarea"
            name="message"
            label="Détails de votre demande"
            type="textarea"
          ></TextInput>
          <FileInput
            {...register('attachments')}
            onChange={onAttachmentsChange}
            wrapperClassName="my-8"
            className="block shadow-md py-2 px-8 rounded-full bg-orange text-xs text-white font-semibold uppercase"
          />
          <CheckBox
            wrapperClassName="my-8"
            boxClassName="shadow-md"
            labelClassName="text-xs text-orange font-semibold leading-tight text-justify"
            name="cgu"
            label="En soumettant ce formulaire et conformément à la politique de traitement des données personnelles, j'accepte
            que les informations saisies soient exploitées afin d'être contacté par les équipes d'Agaetis."
          />
          <div className="flex flex-col justify-center">
            <ReCAPTCHA
              {...register('captcha')}
              className="self-center"
              ref={recaptchaRef}
              size="normal"
              sitekey={publicRuntimeConfig.NEXT_APP_RECAPTCHA_KEY}
              onChange={onCaptchaChange}
            />
            {otherFormProps.errors.captcha && (
              <p className="text-xs text-red text-center pt-2">{otherFormProps.errors.captcha.message}</p>
            )}
          </div>

          <Button
            className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto see-more shadow-md mt-8"
            type="submit"
            disabled={isSubmited}
          >
            {isSubmited ? (
              <div className="flex flex-row justify-center">
                <LoadingSpinner color="#ffffff" size={12} />
                Envoi en cours
              </div>
            ) : (
              'Envoyer'
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
