'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useCallback } from 'react'

export const useRefreshPage = () => {
  const { refresh, push } = useRouter()

  const refreshPage = useCallback(
    ({ redirectTo }: { redirectTo?: string } = {}) => {
      // revalidateServerCache(
      //   route('albums', {
      //     albumId: '661fe38b73e508ff4fd1f703',
      //   }),
      // )

      startTransition(() => {
        refresh()
      })

      if (redirectTo) {
        push(redirectTo)
      }
    },
    [push, refresh],
  )

  return {
    refreshPage,
  }
}
