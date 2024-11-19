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
  setIsOpen: (value: boolean) => void
  onProfileCreated?: () => void
}

export function CreateProfileDialog({
  isOpen,
  walletAddress,
  blockchain,
  setIsOpen,
  onProfileCreated,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
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
