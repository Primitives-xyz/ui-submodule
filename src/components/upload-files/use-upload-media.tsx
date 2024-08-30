import { useCallback, useState } from 'react'
import { IUploadFile } from './upload-files.models'

interface Props {
  getUploadUrl: (file: File) => Promise<string>
}

export function useUploadMedia({ getUploadUrl }: Props) {
  const [postUrl, setPostUrl] = useState<string>()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  function resetUploadMedia() {
    setPostUrl(undefined)
    setUploadProgress(0)
    setUploadSuccess(false)
  }

  const uploadToS3 = (file: File, signedUrl: string) => {
    const request = new XMLHttpRequest()
    request.open('PUT', signedUrl)

    request.upload.addEventListener('progress', (event) => {
      setUploadProgress((event.loaded / event.total) * 100)
    })

    request.addEventListener('load', function (e) {
      setUploadSuccess(request.status === 200)
    })

    request.send(file)
  }

  const uploadMedia = useCallback(
    async ({ file }: IUploadFile) => {
      const postUrl = await getUploadUrl(file)
      setPostUrl(postUrl)
      uploadToS3(file, postUrl)
    },
    [uploadToS3],
  )

  return {
    postUrl,
    uploadProgress,
    uploadSuccess,
    uploadMedia,
    resetUploadMedia,
  }
}
