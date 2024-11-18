'use client'

import { UserRoundCheck, UserRoundPlus } from 'lucide-react'
import { useSWRConfig } from 'swr'
import { Button } from '../../../components/button'
import { Spinner } from '../../../components/spinner'
import { useFollowUser } from '../../hooks/use-follow-user'
import { useGetFollowing } from '../../hooks/use-get-following'
import { useGetProfiles } from '../../hooks/use-get-profiles'

interface Props {
  username: string
  walletAddress: string | null
  mainUsername: string
  loadingMainUsername: boolean
}

export function FollowButton({
  username,
  walletAddress,
  mainUsername,
  loadingMainUsername,
}: Props) {
  const { followUser, loading } = useFollowUser()
  const { mutate } = useSWRConfig()

  const { refetch } = useGetProfiles({
    walletAddress: walletAddress || '',
  })

  const { data: following } = useGetFollowing({ username: mainUsername })
  const followingsList = following?.profiles?.map((item) => item.username)

  const handleFollow = async () => {
    if (mainUsername && username) {
      await followUser({
        followerUsername: mainUsername,
        followeeUsername: username,
      })

      await mutate(
        (key) => typeof key === 'string' && key.includes('following'),
      )

      await refetch()
    }
  }

  if (!walletAddress) {
    return null
  }

  if (followingsList?.includes(username)) {
    return (
      <div className="flex px-4">
        <UserRoundCheck size={15} />
      </div>
    )
  }

  if (mainUsername === username) {
    return null
  }

  return (
    <>
      {loadingMainUsername ? (
        <div className="flex px-4">
          <Spinner />
        </div>
      ) : (
        <Button onClick={handleFollow} variant="ghost" disabled={loading}>
          {loading ? <Spinner /> : <UserRoundPlus size={15} />}
        </Button>
      )}
    </>
  )
}
