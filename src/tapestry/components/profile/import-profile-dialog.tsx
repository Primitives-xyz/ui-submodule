'use client'

import { User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../../../components/button'
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
import { BLOCKCHAIN } from '../../models/profiles.models'

interface Props {
  isOpen: boolean
  walletAddress: string
  blockchain: BLOCKCHAIN
  setIsOpen: (value: boolean) => void
  openCreateProfileDialog: () => void
  onProfileCreated: () => void
}

export function ImportProfileDialog({
  isOpen,
  walletAddress,
  blockchain,
  setIsOpen,
  openCreateProfileDialog,
  onProfileCreated,
}: Props) {
  const { data, loading: getProfilesLoading } = useGetProfiles({
    walletAddress,
  })
  const { createProfile, loading: createProfileLoading } = useCreateProfile()
  const [newProfileUsername, setNewProfileUsername] = useState<string>()

  const onSelectProfile = async (entry: any) => {
    try {
      setNewProfileUsername(entry.profile.username + entry.namespace.name)

      await createProfile({
        username: entry.profile.username,
        walletAddress,
        blockchain,
      })

      onProfileCreated()
    } catch (error) {
      console.log(error)
    } finally {
      setNewProfileUsername(undefined)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="gap-5"
        isStatic={createProfileLoading}
        hideCloseButton={createProfileLoading}
      >
        <DialogHeader>
          <DialogTitle>Select a profile</DialogTitle>
        </DialogHeader>

        {getProfilesLoading && (
          <div className="flex items-center justify-center h-16">
            <Spinner />
          </div>
        )}

        {!!data?.profiles?.length ? (
          <div className="divide-y">
            {data?.profiles?.map((entry) => (
              <Button
                key={entry.profile.username + entry.namespace.name}
                onClick={() => {
                  onSelectProfile(entry)
                }}
                isInvisible
                className="flex items-center justify-start gap-4 w-full p-2 rounded-sm hover:bg-primary/10"
                disabled={createProfileLoading}
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
                {entry.profile.username + entry.namespace.name ===
                  newProfileUsername && (
                  <Spinner className="ml-auto self-center" />
                )}
              </Button>
            ))}
            <Separator label="OR" className="my-4" />
          </div>
        ) : (
          <p className="text-muted-foreground text-center">
            We could not find any profiles on Tapestry. Create one to get
            started!
          </p>
        )}

        <Button
          onClick={() => {
            setIsOpen(false)
            openCreateProfileDialog()
          }}
          disabled={createProfileLoading}
        >
          Create a Profile
        </Button>
      </DialogContent>
    </Dialog>
  )
}
