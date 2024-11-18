import { useState } from 'react'
import { Dialog, DialogContent } from '../../../components/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/tabs'
import { IProfile } from '../../models'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  currentTab: FollowModalTabs
  setCurrentTab: (tab: FollowModalTabs) => void
  profileData: IProfile
  socialData?: ISocial
}

export enum FollowModalTabs {
  FOLLOWING = 'following',
  FOLLOWERS = 'followers',
}

export function SocialModal({
  isOpen,
  setIsOpen,
  currentTab,
  setCurrentTab,
  profileData,
  socialData,
}: Props) {
  const tabs = [
    {
      label: 'following',
      value: FollowModalTabs.FOLLOWING,
      withBullet: socialData?.following?.profiles.length || 0,
    },
    {
      label: 'followers',
      value: FollowModalTabs.FOLLOWERS,
      withBullet: socialData?.followers?.profiles.length || 0,
    },
  ]

  const onClickTab = (tab: FollowModalTabs) => {
    setCurrentTab(tab)
  }

  const [personToFollow, setPersonToFollow] = useState('')

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)

        // if (!open) {
        //   setLoggedOutView(false)
        //   setPersonToFollow('')
        // }
      }}
    >
      <DialogContent>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        {/* <Tab tabs={tabs} currentTabValue={currentTab} onClickTab={onClickTab} /> */}
        {/* <FollowList
          currentTab={currentTab}
          profileData={profileData}
          data={
            currentTab === FollowModalTabs.FOLLOWING
              ? socialData?.following?.profiles
              : socialData?.followers?.profiles
          }
        /> */}
      </DialogContent>
    </Dialog>
  )
}
