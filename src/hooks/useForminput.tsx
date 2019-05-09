import { useCallback, useState } from 'react'

export default function useFormInput(initialValue: any) {
  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback(e => {
    setValue(e.target.value)
  }, [])

  return {
    value,
    onChange: handleChange,
  }
}
