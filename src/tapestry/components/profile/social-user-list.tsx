import { Check, UserRoundPlus } from 'lucide-react'
import { ButtonSize, ButtonVariant } from '../../../components'
import { IProfile } from '../../models'
import { FollowButton } from './follow-button'
import { UserList } from './user-list'

export enum FollowModalTabs {
  FOLLOWING = 'following',
  FOLLOWERS = 'followers',
}

interface Props {
  users: IProfile[]
  currentUsername?: string
}

export function SocialUserList({ users, currentUsername }: Props) {
  return (
    <UserList
      users={users}
      userAction={
        !!currentUsername
          ? (user) => (
              <FollowButton
                usernameToFollow={user.username}
                currentUsername={currentUsername}
                variant={ButtonVariant.GHOST}
                size={ButtonSize.ICON}
              >
                {(isFollowing) => {
                  return isFollowing ? (
                    <Check size={16} />
                  ) : (
                    <UserRoundPlus size={16} />
                  )
                }}
              </FollowButton>
            )
          : undefined
      }
    />
  )
}
