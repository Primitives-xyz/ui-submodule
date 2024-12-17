import { useQuery } from '../../api/use-query'
import { IGetContentResponse } from '../models'

interface Props {
  contentId?: string
  requestingProfileId?: string
}

export const useGetContents = ({ contentId, requestingProfileId }: Props) => {
  const { data, loading, error, refetch } = useQuery<IGetContentResponse>({
    endpoint: `contents/${contentId}`,
    queryParams: {
      requestingProfileId: requestingProfileId ?? '',
    },
  })

  return {
    data,
    refetch,
    loading,
    error,
  }
}
