import { useEffect, useState } from 'react'
import UploadFilesModal from './upload-files-modal'
import { IUploadedFilesUrls, IUploadFile } from './upload-files.models'

interface Props {
  getUploadUrl: (file: File) => Promise<string>
}

export function useUploadFiles({ getUploadUrl }: Props) {
  const [filesToUpload, setFilesToUpload] = useState<IUploadFile[]>([])
  const [uploadedFilesUrls, setUploadedFilesUrls] = useState<
    IUploadedFilesUrls[]
  >([])
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const uploadFiles = (files: IUploadFile[]) => {
    setFilesToUpload(files)
    setModalIsOpen(true)
  }

  const onUploadSuccess = (uploadedFile: IUploadedFilesUrls) => {
    setUploadedFilesUrls((prev) => [...prev, uploadedFile])
  }

  useEffect(() => {
    if (
      uploadedFilesUrls?.length &&
      filesToUpload.length === uploadedFilesUrls.length
    ) {
      setUploadSuccess(true)
      setModalIsOpen(false)
    }
  }, [filesToUpload, uploadedFilesUrls])

  return {
    uploadFiles,
    uploadSuccess,
    uploadedFilesUrls,
    UploadFilesModal: (
      <UploadFilesModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        filesToUpload={filesToUpload}
        onUploadSuccess={onUploadSuccess}
        getUploadUrl={getUploadUrl}
      />
    ),
  }
}
