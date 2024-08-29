import { useCallback, useState } from 'react'
import { IUploadFile, IUploadUrls } from './upload-files.models'
import { useGetUploadUrls } from './use-get-upload-urls'

export function useUploadMedia() {
  const { getUploadUrls } = useGetUploadUrls()
  const [uploadUrls, setUploadUrls] = useState<IUploadUrls>()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  function resetUploadMedia() {
    setUploadUrls(undefined)
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
      const uploadUrls = await getUploadUrls(file)
      setUploadUrls(uploadUrls)
      uploadToS3(file, uploadUrls.postUrl)
    },
    [getUploadUrls, setUploadUrls, uploadToS3],
  )

  return {
    uploadUrls,
    uploadProgress,
    uploadSuccess,
    uploadMedia,
    resetUploadMedia,
  }
}
