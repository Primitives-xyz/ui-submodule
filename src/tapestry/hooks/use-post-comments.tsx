import { FetchMethod, useMutation } from '../../api'
import { IUpdateContentInput } from '../models'

interface Props {
  contentId: string
  profileId: string
  text: string
  commentId?: string
  properties: IUpdateContentInput
}

export const usePostComments = () => {
  const {
    mutate: updateComments,
    loading,
    error,
    data,
  } = useMutation<Props>({
    endpoint: '/comments',
    method: FetchMethod.POST,
  })

  return {
    updateComments,
    loading,
    error,
    data,
  }
}
