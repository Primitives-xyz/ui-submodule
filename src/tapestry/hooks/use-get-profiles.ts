import { useQuery } from '../../api/use-query'
import { IGetProfilesResponse } from '../models'

interface Props {
  walletAddress?: string
  phoneNumber?: string
  shouldIncludeExternalProfiles?: boolean
}

export const useGetProfiles = ({
  walletAddress,
  phoneNumber,
  shouldIncludeExternalProfiles = true,
}: Props) => {
  const { data, loading, error, refetch } = useQuery<IGetProfilesResponse>({
    endpoint: 'profiles',
    queryParams: {
      ...(walletAddress && { walletAddress }),
      ...(phoneNumber && { phoneNumber }),
      shouldIncludeExternalProfiles: shouldIncludeExternalProfiles
        ? 'true'
        : 'false',
    },
    skip: !walletAddress && !phoneNumber,
  })

  return {
    data,
    refetch,
    loading,
    error,
  }
}
