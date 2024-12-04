import { FetchMethod, useMutation } from '../../api'
import { IUpdateContentInput } from '../models'

interface Props {
  id: string
  profileId: string
  properties: IUpdateContentInput
}

export const usePostContents = () => {
  const {
    mutate: updateContent,
    loading,
    error,
    data,
  } = useMutation<Props>({
    endpoint: '/contents/findOrCreate',
    method: FetchMethod.POST,
  })

  return {
    updateContent,
    loading,
    error,
    data,
  }
}
