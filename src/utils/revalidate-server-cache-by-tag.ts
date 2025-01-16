'use server'

import { revalidateTag } from 'next/cache'

export const revalidateServerCacheByTag = async (tag: string) => {
  revalidateTag(tag)
}
