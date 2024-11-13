import { useQuery } from '../../api/use-query'

interface Props {
  walletAddress: string
}

export const useGetProfiles = ({ walletAddress }: Props) => {
  const { data, loading, error, refetch } = useQuery<{
    profiles: any[]
  }>({
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
