import { IUploadUrls } from './upload-files.models'

export function useGetUploadUrls() {
  // const { createSignedUrl } = useCreateSignedUrl()

  const getUploadUrls = async (file: File): Promise<IUploadUrls> => {
    const createSignedResponse = null
    // const createSignedResponse = await createSignedUrl({
    //   key: file.name,
    // })

    if (!createSignedResponse) {
      throw new Error('failed to create signed url')
    }

    return {
      // cloudFrontImageUrl: createSignedResponse.assetUrl.replace(
      //   s3BucketNFTURL,
      //   cloudFrontURL,
      // ),
      cloudFrontImageUrl: 'createSignedResponse.assetUrl',
      postUrl: 'createSignedResponse.postUrl',
    }
  }

  return {
    getUploadUrls,
  }
}
