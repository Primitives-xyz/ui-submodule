'use client'

import { Check } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button, ButtonProps } from '../../../components/button'
import { revalidateServerCache } from '../../../utils'
import { useFollowUser } from '../../hooks/use-follow-user'
import { useGetFollowers } from '../../hooks/use-get-followers'
import { useGetFollowing } from '../../hooks/use-get-following'
import { useUnfollowUser } from '../../hooks/use-unfollow-user'

interface Props extends Omit<ButtonProps, 'children'> {
  followerUsername: string
  followeeUsername: string
  children?: (isFollowing: boolean) => React.ReactNode
}

export function FollowButton({
  followerUsername,
  followeeUsername,
  children,
  ...props
}: Props) {
  const { followUser, loading: followUserLoading } = useFollowUser()
  const { unfollowUser, loading: unfollowUserLoading } = useUnfollowUser()
  const {
    data: followingData,
    loading: getFollowingLoading,
    refetch: refetchGetFollowing,
  } = useGetFollowing({
    username: followerUsername,
  })
  const { refetch: refetchGetFollowers } = useGetFollowers({
    username: followeeUsername,
  })
  const [refetchLoading, setRefetchLoading] = useState(false)

  const followingsList = followingData?.profiles?.map((item) => item.username)
  const loading =
    followUserLoading ||
    getFollowingLoading ||
    refetchLoading ||
    unfollowUserLoading

  const isFollowing = useMemo(() => {
    return !!followingsList?.includes(followeeUsername)
  }, [followingsList, followeeUsername])

  const refetch = async () => {
    setRefetchLoading(true)

    revalidateServerCache(`/api/profiles/${followerUsername}/following`)
    revalidateServerCache(`/api/profiles/${followeeUsername}/followers`)

    // Workaround to revalidate swr after that the cache is invalidated
    setTimeout(async () => {
      await refetchGetFollowing()
      await refetchGetFollowers()

      setRefetchLoading(false)
    }, 500)
  }

  const handleFollow = async () => {
    await followUser({
      followerUsername,
      followeeUsername,
    })

    refetch()

    // await refetchGetFollowing((prevData) => {
    //   return {
    //     ...prevData,
    //     ...{
    //       profiles: [
    //         ...(prevData?.profiles || []),
    //         {
    //           username: followeeUsername,
    //         },
    //       ],
    //     },
    //   }
    // }, false)
  }

  const handleUnfollow = async () => {
    await unfollowUser({
      followerUsername,
      followeeUsername,
    })

    refetch()
  }

  if (followerUsername === followeeUsername) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-1">
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
            {!loading && isFollowing && (
              <>
                <Check className="icon-text-size" />
              </>
            )}
            {isFollowing ? <>Following</> : <>Follow</>}
          </>
        )}
      </Button>
      {/* {isFollowing && (
        <Button
          variant={ButtonVariant.LINK}
          onClick={handleUnfollow}
          className="text-xs"
          disabled={loading}
        >
          Unfollow
        </Button>
      )} */}
    </div>
  )
}
