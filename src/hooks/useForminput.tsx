import { useCallback, useState } from 'react'

export default function useFormInput(initialValue: any) {
  const [value, setValue] = useState(initialValue)
  const [isValidField, setIsValidField] = useState(true)
  const handleChange = useCallback(e => {
    setValue(e.target.value)
  }, [])

  const handleValidation = (isValid: boolean) => {
    setIsValidField(isValid)
    return isValid
  }

  return {
    value,
    onChange: handleChange,
    handleValidation,
    isValidField,
  }
}
