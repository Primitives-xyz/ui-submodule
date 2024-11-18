'use client'

import { Button } from '../../../components/button'
import { useNamespaceProfile } from '../../hooks/use-namespace-profile'
import { IProfile } from '../../models'
import { Avatar } from './avatar'
import { FollowButton } from './follow-button'

interface Props {
  users: IProfile[]
  onClickUser?: (user: IProfile) => void
  walletAddress: string
}

export function UserList({ users, onClickUser, walletAddress }: Props) {
  const { namespaceProfile, loading } = useNamespaceProfile({
    walletAddress,
  })

  return (
    <div className="flex flex-col items-start space-y-1">
      {users.map((user, index) => (
        <div className="flex justify-between items-center w-full">
          <Button
            key={index}
            className="flex items-center gap-3 disabled:opacity-100 text-left py-1"
            onClick={onClickUser ? () => onClickUser(user) : undefined}
            disabled={!onClickUser}
            isInvisible
          >
            <div>
              <Avatar image={user.image} className="w-8 text-lg" />
            </div>
            <p className="w-[150px] truncate">{user.username}</p>
          </Button>
          {walletAddress && (
            <FollowButton
              username={user.username}
              walletAddress={walletAddress}
              mainUsername={namespaceProfile?.profile.username || ''}
              loadingMainUsername={loading}
            />
          )}
        </div>
      ))}
    </div>
  )
}
