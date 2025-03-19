'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../../../components/form'
import { useUpdateProfile } from '../../hooks'
import { useCreateProfile } from '../../hooks/use-create-profile'
import { BLOCKCHAIN } from '../../models/profiles.models'

const formSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      'Username can only contain alphanumeric characters, dashes, or underscores',
    ),
})

interface Props {
  username?: string
  phoneNumber?: string
  email?: string
  walletAddress?: string
  blockchain?: BLOCKCHAIN
  update?: boolean
  onSuccess?: (newUsername?: string) => void
}

export function ProfileForm({
  username,
  phoneNumber,
  email,
  walletAddress,
  blockchain,
  update = false,
  onSuccess,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
    },
  })
  const { createProfile, loading: createProfileLoading } = useCreateProfile()
  const { updateProfile, loading: updateProfileLoading } = useUpdateProfile({
    username: username ?? '',
  })

  const loading = createProfileLoading || updateProfileLoading

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (update) {
        await updateProfile({
          username: values.username,
        })
      } else {
        await createProfile({
          username: values.username,
          phoneNumber,
          email,
          walletAddress,
          blockchain,
        })
      }

      onSuccess?.(values.username)
    } catch (error: any) {
      form.setError('username', {
        message: error?.message ?? 'An error occurred',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={30} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-6" loading={loading} expand>
          {update ? 'Update Profile' : 'Create Profile'}
        </Button>
      </form>
    </Form>
  )
}
