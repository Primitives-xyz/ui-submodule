import { useGetProfiles } from './use-get-profiles'

interface Props {
  walletAddress?: string
  phoneNumber?: string
  email?: string
}

export function useNamespaceProfile({
  walletAddress,
  phoneNumber,
  email,
}: Props) {
  const { data, loading, refetch } = useGetProfiles({
    walletAddress,
    phoneNumber,
    email,
    shouldIncludeExternalProfiles: false,
  })

  const profile = !!data?.profiles?.length ? data?.profiles[0] : null

  return {
    profile,
    loading,
    refetch,
  }
}
