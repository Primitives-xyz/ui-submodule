'use client'

import { useQuery } from '../../api'
import { IGetProfileResponse } from '../models'

export const useGetProfileInfo = ({ username }: { username: string }) => {
  const { data, error, loading, refetch } = useQuery<IGetProfileResponse>({
    endpoint: `/profiles/${username}`,
    bypassCache: true,
  })

  return {
    data,
    loading,
    error,
    refetch,
  }
}
