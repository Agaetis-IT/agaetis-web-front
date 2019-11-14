import * as Yup from 'yup'

export interface WhitepaperFormValues {
  firstName: string
  lastName: string
  email: string
  company: string
  cgu: boolean
}

export const whitePaperInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  cgu: false,
}

export const whitePaperSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string()
    .email("L'email saisi n'est pas valide")
    .required(),
  company: Yup.string().required(),
  cgu: Yup.bool().oneOf(
    [true],
    "Vous devez accepter les conditions générales d'utilisation avant de passer à la prochaine étape"
  ),
})
