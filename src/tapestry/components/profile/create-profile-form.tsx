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
  phoneNumber?: string
  walletAddress?: string
  blockchain?: BLOCKCHAIN
  onProfileCreated?: () => void
}

export function CreateProfileForm({
  phoneNumber,
  walletAddress,
  blockchain,
  onProfileCreated,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  const { createProfile, loading } = useCreateProfile()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createProfile({
        username: values.username,
        phoneNumber,
        walletAddress,
        blockchain,
      })

      onProfileCreated?.()
    } catch (error: any) {
      form.setError('username', {
        message: error?.info?.error ?? 'An error occurred',
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
          Create Profile
        </Button>
      </form>
    </Form>
  )
}
