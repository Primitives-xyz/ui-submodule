'use client'

import { useQuery } from '../../api'
import { IGetCreditsBalanceResponse } from '../models'

export const useGetCreditsBalance = () => {
  const { data, error, loading, refetch } =
    useQuery<IGetCreditsBalanceResponse>({
      endpoint: `/shared/credits/balance`,
    })

  return {
    data,
    loading,
    error,
    refetch,
  }
}
