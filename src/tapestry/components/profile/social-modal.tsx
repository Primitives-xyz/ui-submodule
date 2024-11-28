import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/dialog/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/tabs'
import { IProfile } from '../../models'
import { SocialUserList } from './social-user-list'

export enum FollowModalTabs {
  FOLLOWING = 'following',
  FOLLOWERS = 'followers',
}

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  defaultTab: FollowModalTabs
  followersData?: IProfile[]
  followingData?: IProfile[]
  currentUsername?: string
  onClickUser?: (user: IProfile) => void
}

export function SocialModal({
  isOpen,
  setIsOpen,
  defaultTab,
  followersData,
  followingData,
  currentUsername,
  onClickUser,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Followers modal</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={defaultTab}>
          <div className="flex flex-col items-center justify-center">
            <TabsList>
              <TabsTrigger value={FollowModalTabs.FOLLOWING}>
                Following
              </TabsTrigger>
              <TabsTrigger value={FollowModalTabs.FOLLOWERS}>
                Followers
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="h-[400px] overflow-auto">
            <TabsContent value={FollowModalTabs.FOLLOWING}>
              {!!followingData?.length ? (
                <SocialUserList
                  users={followingData}
                  currentUsername={currentUsername}
                  onClickUser={onClickUser}
                />
              ) : (
                <p className="text-muted-foreground">No users</p>
              )}
            </TabsContent>
            <TabsContent value={FollowModalTabs.FOLLOWERS}>
              {!!followersData?.length ? (
                <SocialUserList
                  users={followersData}
                  currentUsername={currentUsername}
                  onClickUser={onClickUser}
                />
              ) : (
                <p className="text-muted-foreground">No users</p>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
