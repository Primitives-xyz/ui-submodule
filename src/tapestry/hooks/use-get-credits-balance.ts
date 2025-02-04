'use client'

import { useQuery } from '../../api'
import { IGetCreditsBalanceResponse } from '../models'

export const useGetCreditsBalance = (jwt: string) => {
  const { data, error, loading, refetch } =
    useQuery<IGetCreditsBalanceResponse>({
      endpoint: `shared/credits/balance`,
      getJwt: async () => {
        return jwt
      },
    })

  return {
    data,
    loading,
    error,
    refetch,
  }
}
