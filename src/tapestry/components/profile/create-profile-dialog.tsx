'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/dialog/dialog'
import { BLOCKCHAIN } from '../../models/profiles.models'
import { CreateProfileForm } from './create-profile-form'

interface Props {
  isOpen: boolean
  walletAddress: string
  blockchain: BLOCKCHAIN
  onClose?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent
      | CustomEvent<{ originalEvent: PointerEvent }>
      | CustomEvent<{ originalEvent: FocusEvent }>,
  ) => void
  setIsOpen: (value: boolean) => void
  onProfileCreated?: () => void
}

export function CreateProfileDialog({
  isOpen,
  walletAddress,
  blockchain,
  onClose,
  setIsOpen,
  onProfileCreated,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Create Profile</DialogTitle>
        </DialogHeader>
        <CreateProfileForm
          onProfileCreated={onProfileCreated}
          walletAddress={walletAddress}
          blockchain={blockchain}
        />
      </DialogContent>
    </Dialog>
  )
}
