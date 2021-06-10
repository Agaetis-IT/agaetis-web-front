import { ChangeEvent, useState } from 'react'
import clsx from 'clsx'

import styles from '../styles/FileInput.module.css'
import { AttachmentContent } from '../yup/ContactFormValidation'
import LoadingSpinner from './LoadingSpinner'
import SnackBar from './SnackBar'

type Props = {
  className?: string
  wrapperClassName?: string
  onChange: (value: AttachmentContent[]) => void
  fileCount: number
  fileNames: string[]
}

function isWithinAcceptableSizeAndCount(files: FileList | null) {
  if (files === null) return true
  if (files.length > 10) return false

  let total = 0
  for (let i = 0; i < files.length; i++) {
    total += files[i].size
  }

  return total < 10000000
}

export default function FileInput({ className, wrapperClassName, onChange, fileCount, fileNames }: Props) {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  const [isOpenenedModal, setOpenModal] = useState<boolean | undefined>(undefined)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  function handleOpenModal() {
    setOpenModal(true)
  }

  function handleCloseModal() {
    setOpenModal(undefined)
  }

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoadingFiles(true)

    if (!isWithinAcceptableSizeAndCount(e.target.files)) {
      handleOpenModal()
    } else {
      const results: Promise<AttachmentContent>[] = Array.from(e.target.files as FileList).map((file: File) => {
        const reader: FileReader = new FileReader()

        return new Promise((resolve) => {
          reader.onload = () =>
            resolve({
              fileName: file.name,
              content: reader.result as string,
            })

          reader.readAsDataURL(file)
        })
      })

      const files = await Promise.all(results)

      onChange(files)
    }

    setIsLoadingFiles(false)
  }

  return (
    <div className={clsx('flex items-center flex-col md:flex-row', wrapperClassName)}>
      <label htmlFor="fileInput" className="relative">
        <div className="flex flex-col items-center md:items-left">
          <div
            id="button"
            className={clsx(`${styles.uploadButton} top-0 cursor-pointer`, className, { 'drag-over': isDraggingOver })}
          >
            {isLoadingFiles ? (
              <div className="flex flex-row justify-center">
                <LoadingSpinner color="#ffffff" size={12} />
                Chargement des fichiers
              </div>
            ) : fileCount > 0 ? (
              'Modifier les pièces jointes'
            ) : (
              'Ajouter des pièces jointes'
            )}
          </div>
          <span className={`${styles.importLegend} text-gray-500 text-xs leading-tight mt-4`}>
            Sont acceptés les fichiers DOC, DOCX, ODT, RTF, PDF, BMP, JPEG et PNG<br></br>10 fichiers maximum<br></br>
            Taille totale maximale des fichiers : 10 Mo
          </span>
        </div>
        <input
          id="fileInput"
          disabled={isLoadingFiles}
          type="file"
          onChange={onChangeHandler}
          onDragEnter={() => setIsDraggingOver(true)}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={() => setIsDraggingOver(false)}
          className={`${styles.hiddenInput} rounded-full absolute top-0 opacity-0 cursor-pointer`}
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
        {fileNames?.map((file, index) => (index ? ' | ' : '') + file)}
      </span>
      <SnackBar
        message="Pièces jointes invalides : vous avez sélectionné trop de fichiers ou bien la taille totale dépasse 10 Mo"
        isError
        open={isOpenenedModal}
        onClose={handleCloseModal}
      />
    </div>
  )
}
