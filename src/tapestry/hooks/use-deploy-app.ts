import { FetchMethod, useMutation } from '../../api'

interface Props {
  idempotencyKey: string
  amount: number
}

export const useAppDeploy = () => {
  const {
    mutate: deployApp,
    loading,
    error,
    data,
  } = useMutation<Props>({
    endpoint: '/shared/nimbus/deploy',
    method: FetchMethod.POST,
  })

  return {
    deployApp,
    loading,
    error,
    data,
  }
}
