import { useQuery } from '../../api/use-query'
import { IGetProfilesResponse } from '../models'

interface Props {
  walletAddress: string
}

export const useGetProfiles = ({ walletAddress }: Props) => {
  const { data, loading, error, refetch } = useQuery<IGetProfilesResponse>({
    endpoint: 'profiles',
    queryParams: {
      walletAddress,
      shouldIncludeExternalProfiles: 'true',
    },
  })

  return {
    data,
    refetch,
    loading,
    error,
  }
}
