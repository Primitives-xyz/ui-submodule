import { useEffect } from 'react'
import { Progress } from '../progress'
import { IUploadedFilesUrls, IUploadFile } from './upload-files.models'
import { useUploadMedia } from './use-upload-media'

interface Props {
  file: IUploadFile
  onUploadSuccess: (uploadedFile: IUploadedFilesUrls) => void
}

export function UploadFileEntry({ file, onUploadSuccess }: Props) {
  const { uploadMedia, uploadUrls, uploadProgress, uploadSuccess } =
    useUploadMedia()

  useEffect(() => {
    uploadMedia(file)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  useEffect(() => {
    if (uploadSuccess && uploadUrls) {
      onUploadSuccess({
        file,
        uploadUrls,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadSuccess, uploadUrls])

  return <Progress value={uploadProgress} />
}
