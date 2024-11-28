'use client'

import { useState } from 'react'
import { Button } from '../../../components/button'
import { Skeleton } from '../../../components/skeleton'
import { cn, formatNumber } from '../../../utils/utils'
import { useGetFollowers } from '../../hooks/use-get-followers'
import { useGetFollowing } from '../../hooks/use-get-following'
import { IProfile } from '../../models'
import { FollowModalTabs, SocialModal } from './social-modal'

interface Props {
  username: string
  currentUsername?: string
  className?: string
  skeletonClassName?: string
  onClickUser?: (user: IProfile) => void
}

export function ProfileFollowers({
  username,
  currentUsername,
  className,
  skeletonClassName,
  onClickUser,
}: Props) {
  const [currentTab, setCurrentTab] = useState<FollowModalTabs>(
    FollowModalTabs.FOLLOWING,
  )
  const [openModal, setOpenModal] = useState(false)
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
          <Skeleton className={cn('w-[80px] h-[12px]', skeletonClassName)} />
        ) : (
          <Button
            onClick={() => {
              setCurrentTab(FollowModalTabs.FOLLOWING)
              setOpenModal(true)
            }}
            disabled={followingData?.profiles.length === 0}
            isInvisible
          >
            {formatNumber(followingData?.profiles.length ?? 0)} following
          </Button>
        )}

        <span>|</span>

        {loading ? (
          <Skeleton className={cn('w-[80px] h-[12px]', skeletonClassName)} />
        ) : (
          <Button
            onClick={() => {
              setCurrentTab(FollowModalTabs.FOLLOWERS)
              setOpenModal(true)
            }}
            disabled={followersData?.profiles.length === 0}
            isInvisible
          >
            {formatNumber(followersData?.profiles.length ?? 0)} followers
          </Button>
        )}
      </div>

      <SocialModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        defaultTab={currentTab}
        followersData={followersData?.profiles}
        followingData={followingData?.profiles}
        currentUsername={currentUsername}
        onClickUser={onClickUser}
      />
    </>
  )
}
