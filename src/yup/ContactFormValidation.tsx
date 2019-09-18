import * as Yup from 'yup'

export interface Step1FormValues {
  objet: string
}

export const step1Schema = Yup.object().shape({
  objet: Yup.string()
    .required("Vous devez préciser l'objet de votre prise de contact")
    .oneOf(['Un projet ?', 'Une candidature ?', 'Un cafe ?'], "L'objet n'est pas valide"),
})

export interface Step2FormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  cgu: boolean
}

export const step2Schema = Yup.object().shape({
  firstName: Yup.string().required('Ce champ est obligatoire'),
  lastName: Yup.string().required('Ce champ est obligatoire'),
  email: Yup.string()
    .email("L'email saisi n'est pas valide")
    .required('Ce champ est obligatoire'),
  phone: Yup.string().required('Ce champ est obligatoire'),
  company: Yup.string().required('Ce champ est obligatoire'),
  cgu: Yup.bool().oneOf(
    [true],
    "Vous devez accepter les conditions générales d'utilisation avant de passer à la prochaine étape"
  ),
})

export interface Step3FormValues {
  message: string
}

export const step3Schema = Yup.object().shape({
  message: Yup.string().required('Vous devez saisir un message à envoyer'),
})

export default step2Schema
