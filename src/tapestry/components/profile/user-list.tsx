'use client'

import { ReactNode } from 'react'
import { Button } from '../../../components/button'
import { IProfile } from '../../models'
import { Avatar } from './avatar'

interface Props {
  users: IProfile[]
  onClickUser?: (user: IProfile) => void
  userAction?: (user: IProfile) => ReactNode
}

export function UserList({ users, onClickUser, userAction }: Props) {
  return (
    <div className="flex flex-col items-start space-y-1">
      {users.map((user, index) => (
        <div key={index} className="flex justify-between items-center w-full">
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
          {!!userAction && userAction(user)}
        </div>
      ))}
    </div>
  )
}
