'use client'

import { useMutation } from '../../api/use-mutation'

export const useUnfollowUser = () => {
  const {
    mutate: unfollowUser,
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
    endpoint: 'followers/remove',
  })

  return {
    unfollowUser,
    loading,
    error,
    data,
  }
}
