'use client'

import { Check } from 'lucide-react'
import { Button, ButtonProps } from '../../../components/button'
import { revalidateServerCache } from '../../../utils'
import { useFollowUser } from '../../hooks/use-follow-user'
import { useGetFollowers } from '../../hooks/use-get-followers'
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
    refetch: refetchGetFollowing,
  } = useGetFollowing({
    username: currentUsername,
  })
  const { refetch: refetchGetFollowers } = useGetFollowers({
    username: usernameToFollow,
  })

  const followingsList = followingData?.profiles?.map((item) => item.username)
  const loading = followUSerLoading || getFollowingLoading
  const isFollowing = !!followingsList?.includes(usernameToFollow)

  const handleFollow = async () => {
    await followUser({
      followerUsername: currentUsername,
      followeeUsername: usernameToFollow,
    })

    refetchGetFollowing()
    refetchGetFollowers()
    revalidateServerCache(`/api/profile/${currentUsername}/following`)
    revalidateServerCache(`/api/profile/${usernameToFollow}/followers`)
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
              <Check className="icon-text-size" /> Following
            </>
          ) : (
            <>Follow</>
          )}
        </>
      )}
    </Button>
  )
}
