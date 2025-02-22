'use client'

import { useMutation } from '../../api/use-mutation'

export const useFollowUser = () => {
  const {
    mutate: followUser,
    loading,
    error,
    data,
  } = useMutation<
    null,
    {
      followerUsername: string
      followeeUsername: string
    }
  >({
    endpoint: 'followers/add',
  })

  return {
    followUser,
    loading,
    error,
    data,
  }
}
