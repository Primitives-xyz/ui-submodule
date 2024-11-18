import { Button } from '../../../components/button'
import { IProfile } from '../../models'
import { Avatar } from './avatar'

interface Props {
  users: IProfile[]
  onClickUser?: (user: IProfile) => void
}

export function UserList({ users, onClickUser }: Props) {
  return (
    <div className="max-h-[500px] overflow-auto flex flex-col space-y-4">
      {users.map((user, index) => (
        <div key={index} className="flex justify-between items-center w-full">
          <Button
            className="flex items-center justify-start"
            onClick={onClickUser ? () => onClickUser(user) : undefined}
            isInvisible
          >
            <div className="flex items-center w-full">
              <div>
                <Avatar image={user.image} />
              </div>
              <div className="ml-4 w-[200px] text-left">
                <p className="truncate py-2">{user.username}</p>
              </div>
            </div>
          </Button>
        </div>
      ))}
    </div>
  )
}
