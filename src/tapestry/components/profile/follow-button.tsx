'use client'

import { UserRoundCheck, UserRoundPlus } from 'lucide-react'
import { useSWRConfig } from 'swr'
import { Button, ButtonSize, ButtonVariant } from '../../../components/button'
import { Spinner } from '../../../components/spinner'
import { useFollowUser } from '../../hooks/use-follow-user'
import { useGetFollowing } from '../../hooks/use-get-following'

interface Props {
  currentUsername: string
  usernameToFollow: string
}

export function FollowButton({ usernameToFollow, currentUsername }: Props) {
  const { followUser, loading } = useFollowUser()
  const { mutate } = useSWRConfig()
  const { data: following } = useGetFollowing({ username: currentUsername })

  const followingsList = following?.profiles?.map((item) => item.username)

  const handleFollow = async () => {
    if (currentUsername && usernameToFollow) {
      await followUser({
        followerUsername: currentUsername,
        followeeUsername: usernameToFollow,
      })

      await mutate(
        (key) => typeof key === 'string' && key.includes('following'),
      )
    }
  }

  if (followingsList?.includes(usernameToFollow)) {
    return (
      <div className="flex px-4">
        <UserRoundCheck size={15} />
      </div>
    )
  }

  if (currentUsername === usernameToFollow) {
    return null
  }

  return (
    <Button
      onClick={handleFollow}
      variant={ButtonVariant.GHOST}
      size={ButtonSize.ICON}
      disabled={loading}
    >
      {loading ? <Spinner /> : <UserRoundPlus size={15} />}
    </Button>
  )
}
