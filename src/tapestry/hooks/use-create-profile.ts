import { useMutation } from '../../api/use-mutation'
import { IFindOrCreateProfileInput } from '../models/profiles.models'

export const useCreateProfile = <T = IFindOrCreateProfileInput>() => {
  const {
    mutate: createProfile,
    loading,
    error,
    data,
  } = useMutation<null, T>({
    endpoint: 'profiles/create',
  })

  return {
    createProfile,
    loading,
    error,
    data,
  }
}
