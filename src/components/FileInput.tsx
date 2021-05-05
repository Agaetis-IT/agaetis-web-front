import React, { ChangeEvent } from 'react'
import clsx from 'clsx'

import './FileInput.css'

type Props = {
  label: string
  className?: string
  wrapperClassName?: string
}

function FileInput({ label, className, wrapperClassName }: Props) {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
      <label htmlFor="fileInput" className="container-label">
        <div id="button" className={clsx('upload-button', className)}>
          {label}
        </div>
        <input
          id="fileInput"
          type="file"
          onChange={onChangeHandler}
          onDragEnter={() => document.getElementById('button').classList.add('drag-over')}
          onDragLeave={() => document.getElementById('button').classList.remove('drag-over')}
          onDrop={() => document.getElementById('button').classList.remove('drag-over')}
          className="hidden-input rounded-full"
          multiple
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
          .rtf,application/rtf,application/x-rtf,text/richtext,
          .odt,application/vnd.oasis.opendocument.text,
          .pdf,application/acrobat,application/x-pdf,application/vnd.pdf,text/pdf,text/x-pdf,
          .bmp,image/bmp,
          .jpeg,.jpg,image/jpeg,
          .png,image/png"
        />
      </label>
      <span id="fileNames"></span>
    </div>
  )
}

export default FileInput
