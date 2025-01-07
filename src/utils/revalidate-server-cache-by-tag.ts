'use server'

import { revalidateTag } from 'next/cache'

export const revalidateServerCacheByTag = (tag: string) => {
  revalidateTag(tag)
}
