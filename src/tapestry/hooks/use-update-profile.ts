import { FetchMethod } from '../../api/api.models'
import { useMutation } from '../../api/use-mutation'

export const useUpdateProfile = () => {
  const {
    mutate: updateProfile,
    loading,
    error,
    data,
  } = useMutation<
    null,
    {
      bio: string
      username: string
    }
  >({
    endpoint: `profiles/update`,
    method: FetchMethod.PUT,
  })

  return {
    updateProfile,
    loading,
    error,
    data,
  }
}
