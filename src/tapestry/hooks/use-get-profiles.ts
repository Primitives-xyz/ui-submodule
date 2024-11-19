import { useQuery } from '../../api/use-query'
import { IGetProfilesResponse } from '../models'

interface Props {
  walletAddress?: string
  shouldIncludeExternalProfiles?: boolean
}

export const useGetProfiles = ({
  walletAddress,
  shouldIncludeExternalProfiles = true,
}: Props) => {
  const { data, loading, error, refetch } = useQuery<IGetProfilesResponse>({
    endpoint: 'profiles',
    queryParams: {
      walletAddress: walletAddress || '',
      shouldIncludeExternalProfiles: shouldIncludeExternalProfiles
        ? 'true'
        : 'false',
    },
    skip: !walletAddress,
  })

  return {
    data,
    refetch,
    loading,
    error,
  }
}
