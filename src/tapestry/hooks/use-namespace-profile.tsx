import { useMemo } from 'react'
import { useGetProfiles } from './use-get-profiles'

interface Props {
  walletAddress?: string
}

export function useNamespaceProfile({ walletAddress }: Props) {
  const { data, loading } = useGetProfiles({
    walletAddress,
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
  }
}
