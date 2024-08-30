import { useEffect } from 'react'
import { Progress } from '../progress'
import { IUploadedFilesUrls, IUploadFile } from './upload-files.models'
import { useUploadMedia } from './use-upload-media'

interface Props {
  file: IUploadFile
  onUploadSuccess: (uploadedFile: IUploadedFilesUrls) => void
  getUploadUrl: (file: File) => Promise<string>
}

export function UploadFileEntry({
  file,
  onUploadSuccess,
  getUploadUrl,
}: Props) {
  const { uploadMedia, postUrl, uploadProgress, uploadSuccess } =
    useUploadMedia({ getUploadUrl })

  useEffect(() => {
    uploadMedia(file)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  useEffect(() => {
    if (uploadSuccess && postUrl) {
      onUploadSuccess({
        file,
        postUrl,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadSuccess, postUrl])

  return <Progress value={uploadProgress} />
}
