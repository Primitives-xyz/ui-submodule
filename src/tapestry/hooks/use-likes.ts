import { FetchMethod, useMutation } from '../../api'

export const useLike = () => {
  const { mutate, loading, error } = useMutation({
    method: FetchMethod.POST,
    endpoint: '/likes',
  })

  const likeContent = async (contentId: string, username: string) => {
    try {
      await mutate({ contentId, username })
    } catch (err) {
      console.error('Failed to like content:', err)
    }
  }

  return { likeContent, loading, error }
}

export const useUnlike = () => {
  const { mutate, loading, error } = useMutation({
    method: FetchMethod.DELETE,
    endpoint: '/likes',
  })

  const unlikeContent = async (contentId: string, username: string) => {
    try {
      await mutate({ contentId, username })
    } catch (err) {
      console.error('Failed to unlike content:', err)
    }
  }

  return { unlikeContent, loading, error }
}
