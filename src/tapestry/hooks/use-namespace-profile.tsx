import { useMemo } from 'react'
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

  const namespaceProfile = useMemo(() => {
    return data?.profiles.find(
      (entry) =>
        entry.namespace.name === process.env.NEXT_PUBLIC_TAPESTRY_NAMESPACE,
    )
  }, [data])

  return {
    namespaceProfile,
    loading,
    refetch,
  }
}
