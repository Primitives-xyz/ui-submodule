import { FetchMethod } from '../../api/api.models'
import { useMutation } from '../../api/use-mutation'
import { IProfile } from '../models'

interface Props {
  username: string
}

export const useUpdateProfile = ({ username }: Props) => {
  const {
    mutate: updateProfile,
    loading,
    error,
    data,
  } = useMutation<null, Partial<IProfile>>({
    endpoint: `profiles/${username}`,
    method: FetchMethod.PUT,
  })

  return {
    updateProfile,
    loading,
    error,
    data,
  }
}
