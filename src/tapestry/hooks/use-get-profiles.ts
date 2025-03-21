import { useQuery } from '../../api/use-query'
import { IGetProfilesResponse } from '../models'

interface Props {
  walletAddress?: string
  phoneNumber?: string
  email?: string
  shouldIncludeExternalProfiles?: boolean
}

export const useGetProfiles = ({
  walletAddress,
  phoneNumber,
  email,
  shouldIncludeExternalProfiles = true,
}: Props) => {
  const { data, loading, error, refetch } = useQuery<IGetProfilesResponse>({
    endpoint: 'profiles',
    queryParams: {
      ...(walletAddress && { walletAddress }),
      ...(phoneNumber && { phoneNumber }),
      ...(email && { email }),
      shouldIncludeExternalProfiles: shouldIncludeExternalProfiles
        ? 'true'
        : 'false',
    },
    skip: !walletAddress && !phoneNumber && !email,
  })

  return {
    data,
    loading,
    error,
    refetch,
  }
}
