import { useQuery } from '../../api'

interface Props {
  phoneNumber: string
  dynamicUserId: string
  skip?: boolean
}

export function useFindOrGenerateProfile({
  phoneNumber,
  dynamicUserId,
  skip,
}: Props) {
  const { data, loading, error } = useQuery({
    endpoint: 'shared/profiles/check-and-create-random-username',
    queryParams: {
      phoneNumber,
      dynamicUserId,
    },
    skip,
  })

  return {
    data,
    loading,
    error,
  }
}
