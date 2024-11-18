import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/tabs'
import { IProfile } from '../../models'
import { UserList } from './user-list'

export enum FollowModalTabs {
  FOLLOWING = 'following',
  FOLLOWERS = 'followers',
}

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  defaultTab: FollowModalTabs
  setCurrentTab: (tab: FollowModalTabs) => void
  followersData?: IProfile[]
  followingData?: IProfile[]
}

export function SocialModal({
  isOpen,
  setIsOpen,
  defaultTab,
  setCurrentTab,
  followersData,
  followingData,
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
                <UserList users={followingData} />
              ) : (
                <p className="text-muted-foreground">No users</p>
              )}
            </TabsContent>
            <TabsContent value={FollowModalTabs.FOLLOWERS}>
              {!!followersData?.length ? (
                <UserList users={followersData} />
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
