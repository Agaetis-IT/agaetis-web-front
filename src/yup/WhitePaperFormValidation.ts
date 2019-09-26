import * as Yup from 'yup'

export interface WhitepaperFormValues {
  firstName: string
  lastName: string
  email: string
  company: string
  cgu: boolean
}

export const whitePaperSchema = Yup.object().shape({
  firstName: Yup.string().required('Ce champ est obligatoire'),
  lastName: Yup.string().required('Ce champ est obligatoire'),
  email: Yup.string()
    .email("L'email saisi n'est pas valide")
    .required('Ce champ est obligatoire'),
  company: Yup.string().required('Ce champ est obligatoire'),
  cgu: Yup.bool().oneOf(
    [true],
    "Vous devez accepter les conditions générales d'utilisation avant de passer à la prochaine étape"
  ),
})
