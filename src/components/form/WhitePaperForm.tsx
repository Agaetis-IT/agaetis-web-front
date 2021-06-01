/*import clsx from 'clsx'
import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { WhitepaperFormValues, whitePaperInitialValues, whitePaperSchema } from '../../yup/WhitePaperFormValidation'
import Button from '../Button'
import LoadingSpinner from '../LoadingSpinner'

import CheckBox from '../CheckBox'
import TextInput from '../TextInput'
*/
import { WhitepaperFormValues } from '../../yup/WhitePaperFormValidation'

interface Props {
  title: string
  file: string
  className?: string
  isLoading: boolean
  handleNextStep(values: WhitepaperFormValues, title: string, file: string, token: string): void
}

export default function WhitePaperForm({}: Props) {
  return <></>
}
/*
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
      render={() => (
        <Form className={clsx(className, 'justify-center mt-4')}>
          <TextInput
            name="firstName"
            label="Prénom"
            wrapperClassName="flex flex-col my-2"
            className="bg-gray-400"
            type="input"
          />
          <TextInput
            name="lastName"
            label="Nom"
            wrapperClassName="flex flex-col my-2"
            className="bg-gray-400"
            type="input"
          />
          <TextInput
            name="email"
            label="Email"
            wrapperClassName="flex flex-col my-2"
            className="bg-gray-400"
            type="input"
          />
          <TextInput
            name="company"
            label="Société"
            wrapperClassName="flex flex-col my-2"
            className="bg-gray-400"
            type="input"
          />
          <CheckBox
            wrapperClassName="flex flex-col my-2"
            name="cgu"
            label="En soumettant ce formulaire et conformément à la politique de traitement des données personnelles, j'accepte
            que les informations saisies soient exploitées afin d'être contacté par les équipes d'agaetis."
          />

          <div className="flex flex-row justify-center">
            <ReCAPTCHA ref={recaptchaRef} size="normal" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} />
          </div>
          <Button
            className="flex flex-row justify-center uppercase rounded-full bg-orange-500 text-xss leading-normal py-2 px-6 text-white font-semibold mx-auto shadow-md"
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
            className="w-64 block border text-center border-orange-500 text-orange-500 px-8 py-3 leading-none rounded-full uppercase mx-auto mt-4 bg-transparent text-xs font-semibold"
          >
            Voir les autres livres blancs
          </Button>
        </Form>
      )}
    />
  )
}
 */
