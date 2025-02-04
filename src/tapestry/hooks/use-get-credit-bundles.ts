import { useQuery } from '../../api/use-query'
import { ICreditBundle } from '../models'

export const useGetCreditBundles = () => {
  const { data, loading, error, refetch } = useQuery<ICreditBundle[]>({
    endpoint: `creditBundles`,
  })

  return {
    data,
    refetch,
    loading,
    error,
  }
}
