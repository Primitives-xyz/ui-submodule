'use client'

import { useMutation } from '../../api/use-mutation'

interface FollowUserProps {
  followerUsername: string
  followeeUsername: string
}

export const useFollowUser = () => {
  const { mutate, loading, error, data } = useMutation({
    endpoint: '/followers/add',
  })

  const followUser = async ({
    followerUsername,
    followeeUsername,
  }: FollowUserProps) => {
    try {
      await mutate({
        followerUser: { username: followerUsername },
        followeeUser: { username: followeeUsername },
      })
    } catch (err) {
      console.error('Failed to follow user:', err)
    }
  }

  return {
    followUser,
    loading,
    error,
    success: !!data,
    data,
  }
}
