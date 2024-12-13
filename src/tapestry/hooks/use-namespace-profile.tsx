import { useGetProfiles } from './use-get-profiles'

interface Props {
  walletAddress?: string
  phoneNumber?: string
}

export function useNamespaceProfile({ walletAddress, phoneNumber }: Props) {
  const { data, loading, refetch } = useGetProfiles({
    walletAddress,
    phoneNumber,
    shouldIncludeExternalProfiles: false,
  })

  const profile =
    data?.profiles?.length && data?.profiles?.length > 0
      ? data?.profiles[0]
      : null

  return {
    namespaceProfile: profile,
    loading,
    refetch,
  }
}
