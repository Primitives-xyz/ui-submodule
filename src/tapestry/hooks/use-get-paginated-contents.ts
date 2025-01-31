import { usePaginatedQuery } from '../../api'
import { IContent, IGetContentsResponse } from '../models'

interface Props {
  startAtPage?: number
  pageSize?: number
  orderByDirection?: 'ASC' | 'DESC'
  orderByField?: string
}

export const useGetPaginatedContents = <ContentType = IContent>({
  pageSize = 12,
  startAtPage = 2,
  orderByDirection = 'DESC',
  orderByField,
}: Props = {}) => {
  const { data, loading, onLoadMore } = usePaginatedQuery<
    IGetContentsResponse<ContentType>
  >({
    endpoint: 'contents',
    pageSize,
    startAtPage,
    queryParams: {
      orderByDirection,
      orderByField,
    },
  })

  return {
    items: data?.flatMap((data) => data.contents),
    loading,
    hasMore: data?.[data.length - 1]?.contents.length === pageSize,
    onLoadMore,
  }
}
