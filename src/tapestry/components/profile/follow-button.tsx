'use client'

import { Check } from 'lucide-react'
import { Button, ButtonProps } from '../../../components/button'
import { useFollowUser } from '../../hooks/use-follow-user'
import { useGetFollowing } from '../../hooks/use-get-following'

interface Props extends Omit<ButtonProps, 'children'> {
  currentUsername: string
  usernameToFollow: string
  children?: (isFollowing: boolean) => React.ReactNode
}

export function FollowButton({
  usernameToFollow,
  currentUsername,
  children,
  ...props
}: Props) {
  // const { mutate } = useSWRConfig()
  const { followUser, loading: followUSerLoading } = useFollowUser()
  const {
    data: followingData,
    loading: getFollowingLoading,
    refetch,
  } = useGetFollowing({
    username: currentUsername,
  })

  const followingsList = followingData?.profiles?.map((item) => item.username)
  const loading = followUSerLoading || getFollowingLoading
  const isFollowing = !!followingsList?.includes(usernameToFollow)

  const handleFollow = async () => {
    await followUser({
      followerUsername: currentUsername,
      followeeUsername: usernameToFollow,
    })

    // await mutate((key) => typeof key === 'string' && key.includes('following'))
    refetch()
  }

  if (currentUsername === usernameToFollow) {
    return null
  }

  return (
    <Button
      {...props}
      onClick={handleFollow}
      disabled={loading || isFollowing}
      loading={loading}
    >
      {!!children ? (
        children(isFollowing)
      ) : (
        <>
          {isFollowing ? (
            <>
              <Check size={18} /> Following
            </>
          ) : (
            <>Follow</>
          )}
        </>
      )}
    </Button>
  )
}
