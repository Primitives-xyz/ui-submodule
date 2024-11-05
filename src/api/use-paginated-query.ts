import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite'
import { FetchMethod } from './api.models'
import { fetchWrapper, getUrlWithQueryParameters } from './fetch-wrapper'

interface Props<T = any> {
  endpoint: string | null
  params?: T
}

export function usePaginatedQuery<ResponseType, InputType>({
  endpoint,
  params,
}: Props<InputType>): any | SWRInfiniteResponse<ResponseType, Error> {
  const getKey = (pageIndex: number) => {
    if (endpoint) {
      return getUrlWithQueryParameters(endpoint, {
        page: pageIndex.toString(),
        ...params,
      })
    } else {
      return null
    }
  }

  const { data, size, setSize, error, isLoading, mutate } = useSWRInfinite<ResponseType, Error>(
    getKey,
    (endpoint: string) =>
      fetchWrapper<ResponseType>({
        method: FetchMethod.GET,
        endpoint,
      }),
    {
      revalidateFirstPage: false,
    },
  )

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')

  return {
    data,
    page: size,
    error,
    loading: !!isLoadingMore,
    setPage: setSize,
    refetch: mutate,
  }
}
