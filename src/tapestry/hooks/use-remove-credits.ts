import { FetchMethod, useMutation } from '../../api'

interface Props {  
    idempotencyKey: string
    amount: number
}

export const useRemoveCredits = () => {
  const {
    mutate: removeCredits,
    loading,
    error,
    data,
  } = useMutation<Props>({
    endpoint: '/shared/credits/remove',
    method: FetchMethod.POST,    
  })

  return {
    removeCredits,
    loading,
    error,
    data,
  }
}
