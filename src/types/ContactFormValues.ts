import {
  Step1FormValues,
  step1InitialValues,
  Step2FormValues,
  step2InitialValues,
  Step3FormValues,
  step3InitialValues,
} from '../yup/ContactFormValidation'

export default interface FormValues extends Step1FormValues, Step2FormValues, Step3FormValues {}

export const defaultValues = {
  ...step1InitialValues,
  ...step2InitialValues,
  ...step3InitialValues,
}
