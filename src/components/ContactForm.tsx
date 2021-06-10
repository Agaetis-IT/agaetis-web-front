import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'

import Button from './Button'
import TextInput from './TextInput'
import CheckBox from './CheckBox'
import { AttachmentContent, footerContactSchema, FormInput } from '../yup/ContactFormValidation'
import { yupResolver } from '@hookform/resolvers/yup'
const Twitter = '/icons/twitter.png'
const Linkedin = '/icons/linkedin.png'
const Facebook = '/icons/facebook.png'
const Particles = '/images/particles-3-mirror.svg'

import styles from '../styles/Common.module.css'
import ReCAPTCHA from 'react-google-recaptcha'
import FileInput from './FileInput'
import LoadingSpinner from './LoadingSpinner'
import Image from 'next/image'

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

  const watchAttachments = watch('attachments', [])

  useEffect(() => {
    clearErrors()
  }, [clearErrors])

  return (
    <div className="relative">
      <div className="absolute bg-gray-400 left-0 right-0 bottom-0 z-back">
        <Image src={Particles} layout="responsive" height={960} width={1920} quality={100} alt=""/>
      </div>
      <div className="p-6 md:p-12 lg:px-24 lg:p-16">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <h2 className="text-orange-500 text-2xl font-bold leading-normal mb-4 md:mb-0">{title}</h2>
          <div className="flex flex-row items-center">
            <Button
              href="https://fr-fr.facebook.com/AgaetisIT"
              className={`w-6 h-6 mr-4 self-center shadow-sm hover:shadow-md bg-white rounded-full ${styles.smoothTransition} p-1 text-none`}
            >
              <Image src={Facebook} className="w-4 h-4" width={24} height={24} quality={100} alt="Facebook"/>
            </Button>
            <Button
              href="https://www.linkedin.com/company/agaetis/"
              className={`w-6 h-6 mr-4 shadow-sm hover:shadow-md bg-white rounded-full ${styles.smoothTransition} p-1 text-none`}
            >
              <Image src={Linkedin} className="w-4 h-4" width={24} height={24} quality={100} alt="LinkedIn"/>
            </Button>
            <Button
              href="https://twitter.com/agaetisit"
              className={`w-6 h-6 shadow-sm hover:shadow-md bg-white rounded-full ${styles.smoothTransition} p-1 text-none`}
            >
              <Image src={Twitter} className="w-4 h-4" width={24} height={24} quality={100} alt="Twitter"/>
            </Button>
          </div>
        </div>
        {subText && (
          <div className="mb-8">
            <p className="text-sm leading-normal" dangerouslySetInnerHTML={{ __html: subText }} />
          </div>
        )}
        <FormProvider register={register} watch={watch} control={control} clearErrors={clearErrors} {...otherFormProps}>
          <form onSubmit={otherFormProps.handleSubmit(handleSubmit)}>
            <div className="flex flex-col md:flex-row justify-between">
              <TextInput
                wrapperClassName="w-full md:w-1/5"
                className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
                name="lastname"
                label="Nom"
                type="input"
              ></TextInput>
              <TextInput
                wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
                className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
                name="firstname"
                label="Prénom"
                type="input"
              ></TextInput>
              <TextInput
                wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
                className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
                name="mail"
                label="Mail"
                type="input"
              ></TextInput>
              <TextInput
                wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
                className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
                name="phone"
                label="Téléphone"
                type="input"
              ></TextInput>
            </div>
            <TextInput
              wrapperClassName="my-8"
              className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
              name="subject"
              label="Sujet de votre demande"
              type="input"
            ></TextInput>
            <TextInput
              wrapperClassName="my-8"
              className={`appearance-none w-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight ${styles.messageTextarea}`}
              name="message"
              label="Détails de votre demande"
              type="textarea"
            ></TextInput>
            <FileInput
              {...register('attachments')}
              onChange={onAttachmentsChange}
              wrapperClassName="my-8"
              className="block shadow-md py-2 px-8 rounded-full bg-orange-500 text-xs leading-tight text-white font-semibold uppercase"
              fileCount={watchAttachments?.length}
              fileNames={watchAttachments?.map((file) => file.fileName)}
            />
            <CheckBox
              wrapperClassName="my-8"
              boxClassName="shadow-md"
              labelClassName="text-xs text-orange-500 font-semibold leading-tight text-justify"
              name="cgu"
              label="En soumettant ce formulaire et conformément à la politique de traitement des données personnelles, j'accepte
              que les informations saisies soient exploitées afin d'être contacté par les équipes d'Agaetis."
            />
            <div className="flex flex-col justify-center items-center">
              <ReCAPTCHA
                {...register('captcha')}
                ref={recaptchaRef}
                size="normal"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                onChange={onCaptchaChange}
              />
              {otherFormProps.formState.errors.captcha && (
                <p className="text-xs leading-normal text-red-500 text-center pt-2">
                  {otherFormProps.formState.errors.captcha.message}
                </p>
              )}
            </div>

            <Button
              className="flex flex-row justify-center uppercase rounded-full bg-orange-500 text-xss leading-tight py-2 px-6 text-white font-semibold mx-auto shadow-md mt-8"
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
    </div>
  )
}
