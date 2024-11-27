'use server'

import { revalidatePath } from 'next/cache'

export const revalidateServerCache = async (path?: string) => {
  try {
    if (path) {
      revalidatePath(path)
    } else {
      revalidatePath('/')
    }
  } catch (error) {
    console.error('revalidateServerCache', error)
  }
}
