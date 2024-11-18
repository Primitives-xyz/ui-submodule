'use client'

import { Button } from '../../../components/button'
import { Skeleton } from '../../../components/skeleton'
import { cn, formatNumber } from '../../../utils'
import { useGetFollowers } from '../../hooks/use-get-followers'
import { useGetFollowing } from '../../hooks/use-get-following'

interface Props {
  username: string
  className?: string
}

export function ProfileFollowers({ username, className }: Props) {
  // const [currentTab, setCurrentTab] = useState<FollowModalTabs>(
  //   FollowModalTabs.FOLLOWING,
  // )
  // const [openFollowModal, setOpenFollowModal] = useState(false)
  const { data: followersData, loading: followersLoading } = useGetFollowers({
    username,
  })
  const { data: followingData, loading: followingLoading } = useGetFollowing({
    username,
  })

  const loading = followersLoading || followingLoading

  return (
    <>
      <div className={cn('flex items-center gap-2', className)}>
        {loading ? (
          <Skeleton className="w-[80px] h-[12px] bg-popover-muted" />
        ) : (
          <Button
            onClick={() => {
              // setCurrentTab(FollowModalTabs.FOLLOWING)
              // setOpenFollowModal(true)
            }}
            isInvisible
          >
            {formatNumber(followersData?.profiles.length ?? 0)} following
          </Button>
        )}

        <span>|</span>

        {loading ? (
          <Skeleton className="w-[80px] h-[12px] bg-popover-muted" />
        ) : (
          <Button
            onClick={() => {
              // setCurrentTab(FollowModalTabs.FOLLOWERS)
              // setOpenFollowModal(true)
            }}
            isInvisible
          >
            {formatNumber(followingData?.profiles.length ?? 0)} followers
          </Button>
        )}
      </div>

      {/*       
      <FollowModal
        isOpen={openFollowModal}
        setIsOpen={setOpenFollowModal}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        profileData={profile}
        socialData={socialData}
      /> */}
    </>
  )
}
