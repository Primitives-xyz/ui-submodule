import { useMutation } from '../../api/use-mutation'
import { IFindOrCreateProfileInput } from '../profiles.models'

export const useCreateProfile = () => {
  const {
    mutate: createProfile,
    loading,
    error,
    data,
  } = useMutation<null, IFindOrCreateProfileInput>({
    endpoint: 'profiles/create',
  })

  return {
    createProfile,
    loading,
    error,
    data,
  }
}