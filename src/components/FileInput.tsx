import React, { ChangeEvent } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label: string
  className?: string
  wrapperClassName?: string
}

function FileInput({ name, label, className, wrapperClassName }: Props) {
  const { register, trigger, formState } = useFormContext()

  const triggerValidation = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    // @ts-ignore
    formState.isDirty && trigger(name)

    for (const file of e.target.files) {
      const reader: FileReader = new FileReader()

      reader.readAsBinaryString(file)

      reader.onload = () => {
        console.log(reader.result)
      }
    }
  }

  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <input
        type="file"
        name={name}
        placeholder={label}
        ref={register()}
        onChange={triggerValidation}
        className={className}
        multiple
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
        .rtf,application/rtf,application/x-rtf,text/richtext,
        .odt,application/vnd.oasis.opendocument.text,
        .pdf,application/acrobat,application/x-pdf,application/vnd.pdf,text/pdf,text/x-pdf,
        .bmp,image/bmp,
        .jpeg,.jpg,image/jpeg,
        .png,image/png"
      />
    </div>
  )
}

export default FileInput
