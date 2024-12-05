'use server'

import { revalidatePath } from 'next/cache'

export const revalidateServerCache = async (path?: string) => {
  try {
    if (path) {
      // if (!process.env.NEXT_PUBLIC_SERVER_URL) {
      //   throw new Error('NEXT_PUBLIC_SERVER_URL is not defined')
      // }

      // revalidatePath(
      //   createURL({
      //     domain: process.env.NEXT_PUBLIC_SERVER_URL,
      //     endpoint: path,
      //   }),
      // )

      revalidatePath(path)
    } else {
      revalidatePath('/')
    }
  } catch (error) {
    console.error('revalidateServerCache', error)
  }
}
