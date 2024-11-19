'use client'

import { useQuery } from '../../api'
import { ISuggestedProfiles } from '../models'

interface Props {
  walletAddress: string
  ownAppOnly: boolean
}

export function useSuggested({ walletAddress, ownAppOnly }: Props) {
  const {
    data: profiles,
    error,
    loading,
    refetch,
  } = useQuery<ISuggestedProfiles[]>({
    endpoint: '/profiles/suggested',
    queryParams: {
      walletAddress,
      ownAppOnly: ownAppOnly.toString(),
    },
    skip: !walletAddress,
  })

  return {
    profiles,
    loading,
    error,
    refetch,
  }
}
