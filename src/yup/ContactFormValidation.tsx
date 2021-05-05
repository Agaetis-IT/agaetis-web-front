import Yup from '../config/yupConfig'

export interface AttachmentContent {
  fileName: string
  dataString: string
  contentType: string
}

export interface FooterFormInput {
  firstname: string
  lastname: string
  mail: string
  phone: string
  subject: string
  message: string
  cgu: boolean
  captcha: string
  attachments: AttachmentContent[]
}

export const footerContactSchema = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  mail: Yup.string().required().email("L'email saisi n'est pas valide"),
  phone: Yup.string()
    .matches(
      /^((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/,
      'La saisie ne correspond pas à un numéro de téléphone valide'
    )
    .required(),
  subject: Yup.string().required(),
  message: Yup.string().required(),
  cgu: Yup.boolean()
    .required()
    .oneOf(
      [true],
      'Vous devez accepter la politique de traitement des données personnelles pour soumettre ce formulaire'
    ),
  captcha: Yup.string()
    .nullable()
    .test(
      'empty-check',
      'Vous devez compléter le ReCAPTCHA pour soumettre ce formulaire',
      (captcha) => !(!captcha || captcha.length == 0)
    ),
})
