'use client'

import { useQuery } from '../../api'
import { IGetSocialResponse } from '../models'

interface Props {
  username: string
}

export const useGetFollowing = ({ username }: Props) => {
  const { data, error, loading, refetch } = useQuery<IGetSocialResponse>({
    endpoint: `/profiles/${username}/following`,
  })

  return {
    // data: {
    //   profiles: [
    //     { id: 1, username: 'John Doe qwwqe' },
    //     { id: 2, username: 'Jane Smith asdasd' },
    //   ],
    // } as any,
    data,
    loading,
    error,
    refetch,
  }
}
