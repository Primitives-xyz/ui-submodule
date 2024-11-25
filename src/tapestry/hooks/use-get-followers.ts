'use client'

import { useQuery } from '../../api'
import { IGetSocialResponse } from '../models'

interface Props {
  username: string
}

export const useGetFollowers = ({ username }: Props) => {
  const { data, error, loading, refetch } = useQuery<IGetSocialResponse>({
    endpoint: `/profiles/${username}/followers`,
  })

  return {
    data: {
      profiles: [
        { id: 1, username: 'John Doe' },
        { id: 2, username: 'Jane Smith' },
        { id: 3, username: 'Alice Johnson' },
        { id: 4, username: 'Bob Brown' },
        { id: 5, username: 'Charlie Davis' },
        { id: 6, username: 'Diana Evans' },
        { id: 7, username: 'Eve Foster' },
        { id: 8, username: 'Frank Green' },
        { id: 9, username: 'Grace Harris' },
        { id: 10, username: 'Hank Ingram' },
        { id: 11, username: 'Ivy Johnson' },
        { id: 12, username: 'Jack King' },
        { id: 13, username: 'Karen Lee' },
        { id: 14, username: 'Leo Martin' },
      ],
    } as any,
    // data,
    loading,
    error,
    refetch,
  }
}
