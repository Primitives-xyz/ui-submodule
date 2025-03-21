import { useQuery } from '../../api'

interface Props {
  phoneNumber?: string
  email?: string
  dynamicUserId: string
  skip?: boolean
}

export function useFindOrGenerateProfile({
  phoneNumber,
  email,
  dynamicUserId,
  skip,
}: Props) {
  let queryParams: {
    phoneNumber?: string
    email?: string
    dynamicUserId?: string
  } = {
    dynamicUserId,
  }

  if (!!phoneNumber) {
    queryParams.phoneNumber = phoneNumber
  }

  if (!!email) {
    queryParams.email = email
  }

  const { data, loading, error } = useQuery({
    endpoint: 'shared/profiles/check-and-create-random-username',
    queryParams,
    skip,
  })

  return {
    data,
    loading,
    error,
  }
}
