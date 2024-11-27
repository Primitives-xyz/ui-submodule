import { FetchMethod } from '../../api/api.models'
import { useMutation } from '../../api/use-mutation'
import { IUpdateContentInput } from '../models'

interface Props {
  contentId: string
}

export const useUpdateContent = ({ contentId }: Props) => {
  const {
    mutate: updateContent,
    loading,
    error,
    data,
  } = useMutation<null, IUpdateContentInput>({
    endpoint: `contents/${contentId}`,
    method: FetchMethod.PUT,
  })

  return {
    updateContent,
    loading,
    error,
    data,
  }
}
