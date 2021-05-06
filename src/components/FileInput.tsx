import React, { ChangeEvent, useState } from 'react'
import clsx from 'clsx'

import './FileInput.css'
import { AttachmentContent } from '../yup/ContactFormValidation'
import LoadingSpinner from './LoadingSpinner'

type Props = {
  className?: string
  wrapperClassName?: string
  onChange?: (value: AttachmentContent[]) => void
}

function FileInput({ className, wrapperClassName, onChange }: Props) {
  const [files, setFiles] = useState([])
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoadingFiles(true)

    const results: Promise<AttachmentContent>[] = Array.from(e.target.files).map((file) => {
      const reader: FileReader = new FileReader()

      return new Promise((resolve) => {
        reader.onload = () =>
          resolve({
            fileName: file.name,
            dataString: reader.result as string,
          })

        reader.readAsBinaryString(file)
      })
    })

    const files = await Promise.all(results)

    setFiles(files)
    onChange(files)
    setIsLoadingFiles(false)
  }

  return (
    <div className={clsx('flex items-center flex-col md:flex-row', wrapperClassName)}>
      <label htmlFor="fileInput" className="container-label">
        <div id="button" className={clsx('upload-button', className)}>
          {isLoadingFiles ? (
            <div className="flex flex-row justify-center">
              <LoadingSpinner color="#ffffff" size={12} />
              Chargement des fichiers
            </div>
          ) : files.length > 0 ? (
            'Modifier les pièces jointes'
          ) : (
            'Ajouter des pièces jointes'
          )}
        </div>
        <input
          id="fileInput"
          disabled={isLoadingFiles}
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
      <span id="fileNames" className="mt-4 md:ml-4 md:mt-0">
        {files.map((file, index) => (index ? ' | ' : '') + file.fileName)}
      </span>
    </div>
  )
}

export default FileInput
