'use client'

import { useQuery } from '../../api'
import { ISuggestedProfiles } from '../models'

interface Props {
  identifier: string
  contactType?: 'EMAIL' | 'PHONE' | 'TWITTER'
  ownAppOnly: boolean
}

export function useGetSuggested({
  identifier,
  contactType,
  ownAppOnly,
}: Props) {
  let queryParams: Record<string, string> = {
    identifier,
    ownAppOnly: ownAppOnly.toString(),
  }

  if (!!contactType) {
    queryParams.contactType = contactType
  }

  const {
    data: profiles,
    error,
    loading,
    refetch,
  } = useQuery<ISuggestedProfiles[]>({
    endpoint: '/shared/profiles/suggested',
    queryParams,
    skip: !identifier,
  })

  return {
    profiles,
    loading,
    error,
    refetch,
  }
}
