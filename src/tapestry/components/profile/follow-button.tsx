'use client'

import { Plus, UserRoundCheck, UserRoundPlus } from 'lucide-react'
import { useSWRConfig } from 'swr'
import { Button } from '../../../components/button'
import { Spinner } from '../../../components/spinner'
import { useFollowUser } from '../../hooks/use-follow-user'
import { useGetProfiles } from '../../hooks/use-get-profiles'

interface Props {
  username: string
  walletAddress: string | null
  mainUsername: string
  loadingMainUsername: boolean
  forSuggestedModal?: boolean
  followingsList?: string[]
}

export function FollowButton({
  username,
  walletAddress,
  mainUsername,
  loadingMainUsername,
  forSuggestedModal,
  followingsList,
}: Props) {
  const { followUser, loading } = useFollowUser()
  const { mutate } = useSWRConfig()
  const { refetch } = useGetProfiles({
    walletAddress: walletAddress || '',
    shouldIncludeExternalProfiles: false,
  })

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
        <UserRoundCheck size={20} />
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
        <>
          {forSuggestedModal ? (
            <Button variant="outline" size="sm" onClick={handleFollow}>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Plus size={20} />
                  Follow
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleFollow} disabled={loading}>
              {loading ? <Spinner /> : <UserRoundPlus size={20} />}
            </Button>
          )}
        </>
      )}
    </>
  )
}
