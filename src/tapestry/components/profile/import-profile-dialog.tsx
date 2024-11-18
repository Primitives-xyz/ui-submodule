'use client'

import { User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button, ButtonVariant } from '../../../components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/dialog'
import { Separator } from '../../../components/separator'
import { Spinner } from '../../../components/spinner'
import { useCreateProfile } from '../../hooks/use-create-profile'
import { useGetProfiles } from '../../hooks/use-get-profiles'
import { BLOCKCHAIN, IProfile } from '../../models/profiles.models'
import { CreateProfileDialog } from './create-profile-dialog'

interface Props {
  isOpen: boolean
  walletAddress: string
  blockchain: BLOCKCHAIN
  setIsOpen: (value: boolean) => void
  onProfileCreated: () => void
}

export function ImportProfileDialog({
  isOpen,
  walletAddress,
  blockchain,
  setIsOpen,
  onProfileCreated,
}: Props) {
  const { data, loading: getProfilesLoading } = useGetProfiles({
    walletAddress,
  })
  const { createProfile, loading: createProfileLoading } = useCreateProfile()
  const [newProfileId, setNewProfileId] = useState<string>()
  const [openCreateProfileModal, setOpenCreateProfileModal] = useState(false)

  const onSelectProfile = async (entry: IProfile) => {
    try {
      setNewProfileId(entry.id)

      await createProfile({
        username: entry.username,
        walletAddress,
        blockchain,
      })

      onProfileCreated()
    } catch (error) {
      console.log(error)
    } finally {
      setNewProfileId(undefined)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="gap-6"
          isStatic={createProfileLoading}
          hideCloseButton={createProfileLoading}
        >
          <DialogHeader>
            <DialogTitle>Select a Tapestry profile</DialogTitle>
          </DialogHeader>

          {getProfilesLoading && (
            <div className="flex items-center justify-center h-16">
              <Spinner />
            </div>
          )}

          {!!data?.profiles?.length && (
            <div className="divide-y">
              {data?.profiles?.map((entry) => (
                <Button
                  key={entry.profile.id}
                  onClick={() => {
                    onSelectProfile(entry.profile)
                  }}
                  className="flex items-center justify-start gap-4 w-full p-2 rounded-sm h-auto"
                  disabled={createProfileLoading}
                  variant={ButtonVariant.GHOST}
                >
                  <div className="w-11 h-11 bg-accent shrink-0 flex items-center justify-center rounded-full relative">
                    {entry.profile.image ? (
                      <>
                        <Image
                          alt=""
                          src={entry.profile.image}
                          width={50}
                          height={50}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </>
                    ) : (
                      <User />
                    )}
                    {!!entry.namespace.faviconURL && (
                      <Image
                        alt=""
                        src={entry.namespace.faviconURL}
                        width={24}
                        height={24}
                        className="w-6 h-6 absolute -bottom-1 -right-1 rounded-full bg-white shadow-sm"
                      />
                    )}
                  </div>
                  <h4 className="truncate max-w-32 text-lg">
                    {entry.profile.username}
                  </h4>
                  {entry.profile.id === newProfileId && (
                    <Spinner className="ml-auto self-center" />
                  )}
                </Button>
              ))}
              <Separator label="OR" className="mt-6" />
            </div>
          )}

          {!data?.profiles?.length && !getProfilesLoading && (
            <p className="text-muted-foreground text-center">
              We could not find any profiles on Tapestry. Create one to get
              started!
            </p>
          )}

          {!getProfilesLoading && (
            <Button
              onClick={() => {
                setIsOpen(false)
                setOpenCreateProfileModal(true)
              }}
              disabled={createProfileLoading}
            >
              Create a Profile
            </Button>
          )}
        </DialogContent>
      </Dialog>
      <CreateProfileDialog
        isOpen={openCreateProfileModal}
        setIsOpen={setOpenCreateProfileModal}
        onProfileCreated={() => {
          onProfileCreated()
          setOpenCreateProfileModal(false)
        }}
        walletAddress={walletAddress}
        blockchain={blockchain}
      />
    </>
  )
}
