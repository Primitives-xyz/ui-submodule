'use server'

import { revalidatePath } from 'next/cache'

export const revalidateServerCache = async (path: string) => {
  revalidatePath(path)
}
