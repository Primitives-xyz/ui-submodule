'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/dialog/dialog'
import { BLOCKCHAIN } from '../../models/profiles.models'
import { ProfileForm } from './profile-form'

interface Props {
  open: boolean
  username?: string
  phoneNumber?: string
  walletAddress?: string
  blockchain?: BLOCKCHAIN
  update?: boolean
  onClose?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent
      | CustomEvent<{ originalEvent: PointerEvent }>
      | CustomEvent<{ originalEvent: FocusEvent }>,
  ) => void
  setOpen: (value: boolean) => void
  onSuccess?: (newUsername?: string) => void
}

export function EditProfileDialog({
  open,
  username,
  phoneNumber,
  walletAddress,
  blockchain,
  update,
  onClose,
  setOpen,
  onSuccess,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>
            {update ? 'Update Profile' : 'Create Profile'}
          </DialogTitle>
        </DialogHeader>
        <ProfileForm
          onSuccess={onSuccess}
          username={username}
          phoneNumber={phoneNumber}
          walletAddress={walletAddress}
          blockchain={blockchain}
          update={update}
        />
      </DialogContent>
    </Dialog>
  )
}
