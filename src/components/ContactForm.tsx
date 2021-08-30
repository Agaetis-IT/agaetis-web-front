import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
const ReCAPTCHA = dynamic(
  () => import('react-google-recaptcha'),
  { loading: () => <p>Chargement du ReCAPTCHA...</p> }
)
import { yupResolver } from '@hookform/resolvers/yup'

import Button from './Button'
import CheckBox from './CheckBox'
import FileInput from './FileInput'
import LoadingSpinner from './LoadingSpinner'
import SnackBar from '../components/SnackBar'
import TextInput from './TextInput'

import { AttachmentContent, footerContactSchema, FormInput } from '../yup/ContactFormValidation'
import send from '../services/contactService'

const Twitter = '/icons/twitter.png'
const Linkedin = '/icons/linkedin.png'
const Facebook = '/icons/facebook.png'
const Particles = '/images/particles-3-mirror.svg'

interface Props {
  title: string
  subText?: string
  isPage?: boolean
}

export default function ContactForm({ title, subText, isPage }: Props) {
  const [snackBarOpenWithError, setSnackBarOpenWithError] = useState<boolean | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false)

  function handleOpenModal(error: boolean) {
    setSnackBarOpenWithError(error)
    setIsSubmitting(false)
  }

  function handleCloseModal() {
    setSnackBarOpenWithError(undefined)
  }

  async function handleSubmit(data: FormInput) {
    if (isSubmitting || isSuccessfullySubmitted) {
      return
    }

    try {
      setIsSubmitting(true)
      await send(data)
      handleOpenModal(false)
      setIsSuccessfullySubmitted(true)
    } catch {
      handleOpenModal(true)
    }
  }

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

  const ComponentProp: React.ElementType = isPage ? 'h1' : 'h2'

  return (
    <>
      <div
        style={{
          backgroundImage: `url("${Particles}")`,
          backgroundPosition: 'bottom',
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
        }}
        className="p-6 md:p-12 lg:px-24 lg:p-16 bg-gray-400"
      >
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <ComponentProp className="text-orange-500 text-2xl font-bold leading-normal mb-4 md:mb-0">
            {title}
          </ComponentProp>
          <div className="flex flex-row items-center">
            <Button
              href="https://fr-fr.facebook.com/AgaetisIT"
              className="w-6 h-6 mr-4 self-center shadow-sm hover:shadow-md bg-white hover:bg-gray-200 rounded-full transition-all duration-250 p-1 text-none"
            >
              <img
                src={Facebook}
                className="w-4 h-4"
                title="Retrouvez-nous sur Facebook"
                alt="Facebook"
                width={16}
                height={16}
                loading="lazy"
              />
            </Button>
            <Button
              href="https://www.linkedin.com/company/agaetis/"
              className="w-6 h-6 mr-4 shadow-sm hover:shadow-md bg-white hover:bg-gray-200 rounded-full transition-all duration-250 p-1 text-none"
            >
              <img
                src={Linkedin}
                className="w-4 h-4"
                title="Retrouvez-nous sur LinkedIn"
                alt="LinkedIn"
                width={16}
                height={16}
                loading="lazy"
              />
            </Button>
            <Button
              href="https://twitter.com/agaetisit"
              className="w-6 h-6 shadow-sm hover:shadow-md bg-white hover:bg-gray-200 rounded-full transition-all duration-250 p-1 text-none"
            >
              <img
                src={Twitter}
                className="w-4 h-4"
                title="Retrouvez-nous sur Twitter"
                alt="Twitter"
                width={16}
                height={16}
                loading="lazy"
              />
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
              />
              <TextInput
                wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
                className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
                name="firstname"
                label="Prénom"
                type="input"
              />
              <TextInput
                wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
                className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
                name="mail"
                label="Mail"
                type="input"
              />
              <TextInput
                wrapperClassName="w-full md:w-1/5 mt-8 md:mt-0"
                className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
                name="phone"
                label="Téléphone"
                type="input"
              />
            </div>
            <TextInput
              wrapperClassName="my-8"
              className="appearance-none rounded-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight"
              name="subject"
              label="Sujet de votre demande"
              type="input"
            />
            <TextInput
              wrapperClassName="my-8"
              className={`appearance-none w-full text-xs p-3 shadow-md text-orange-500 placeholder-orange-400 font-semibold leading-tight block h-48 rounded-3xl`}
              name="message"
              label="Détails de votre demande"
              type="textarea"
            />
            <FileInput
              {...register('attachments')}
              onChange={onAttachmentsChange}
              wrapperClassName="my-8"
              className="block shadow-md py-2 px-8 rounded-full text-xs leading-tight text-white font-semibold uppercase hover:shadow-lg transition-all duration-250"
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
              className={clsx(
                'flex flex-row justify-center uppercase rounded-full text-xss leading-tight py-2 px-6 text-white font-semibold mx-auto shadow-md mt-8 hover:shadow-lg transition-all duration-250',
                isSubmitting || isSuccessfullySubmitted ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-400'
              )}
              type="submit"
              disabled={isSubmitting || isSuccessfullySubmitted}
            >
              {isSubmitting ? (
                <div className="flex flex-row justify-center">
                  <LoadingSpinner color="#ffffff" size={12} />
                  Envoi en cours
                </div>
              ) : isSuccessfullySubmitted ? (
                'Envoi effectué'
              ) : (
                'Envoyer'
              )}
            </Button>
          </form>
        </FormProvider>
      </div>
      <SnackBar
        message={snackBarOpenWithError ? "Erreur pendant l'envoi du message" : 'Message envoyé'}
        isError={snackBarOpenWithError}
        open={snackBarOpenWithError}
        onClose={handleCloseModal}
      />
    </>
  )
}
