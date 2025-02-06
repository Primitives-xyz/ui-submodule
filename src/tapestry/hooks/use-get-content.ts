import { useQuery } from '../../api/use-query'
import { IContent, IGetContentResponse } from '../models'

interface Props {
  contentId: string
  requestingProfileId?: string
  skip?: boolean
}

export const useGetContent = <ContentType = IContent>({
  contentId,
  requestingProfileId,
  skip,
}: Props) => {
  const { data, loading, error, refetch } = useQuery<
    IGetContentResponse<ContentType>
  >({
    endpoint: `contents/${contentId}`,
    queryParams: requestingProfileId
      ? {
          requestingProfileId,
        }
      : undefined,
    skip,
  })

  return {
    data,
    refetch,
    loading,
    error,
  }
}
