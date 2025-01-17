'use client'

import { useQuery } from '../../api'
import { IGetFollowersStateResponse } from '../models'

interface Props {
  followeeUsername: string
  followerUsername: string
}

export const useGetFollowersState = ({
  followeeUsername,
  followerUsername,
}: Props) => {
  const { data, error, loading, refetch } =
    useQuery<IGetFollowersStateResponse>({
      endpoint: `followers/state`,
      queryParams: {
        startId: followerUsername,
        endId: followeeUsername,
      },
    })

  return {
    data,
    loading,
    error,
    refetch,
  }
}
