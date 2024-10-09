import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'
import { FetchMethod } from './api.models'
import {
  fetchWrapper,
  getUrlWithPathParameters,
  getUrlWithQueryParameters,
} from './fetch-wrapper'

interface UsePaginatedQueryProps {
  endpoint: string
  pathParams?: Record<string, string>
  queryParams?: Record<string, string>
  config?: SWRInfiniteConfiguration
  toBackend?: boolean
  getJwt?: () => Promise<string | undefined>
  pageSize?: number
  skip?: boolean
}

export function usePaginatedQuery<
  ResponseType extends {
    contents: any[]
    page: number
    pageSize: number
  } = any,
  Error = unknown,
>({
  endpoint: _endpoint,
  queryParams,
  pathParams,
  config,
  toBackend = true,
  pageSize = 10,
  skip = false,
  getJwt,
}: UsePaginatedQueryProps): ReturnType<typeof useSWRInfinite | any> {
  const shouldFetch = !!_endpoint && !skip

  const getKey = (pageIndex: number, previousPageData: ResponseType | null) => {
    if (
      !shouldFetch ||
      (previousPageData && previousPageData.contents.length === 0)
    )
      return null

    let endpoint = _endpoint
    endpoint = getUrlWithPathParameters({ endpoint, pathParams })

    const paginatedParams = {
      ...queryParams,
      page: pageIndex.toString(),
      pageSize: pageSize.toString(),
    }

    return getUrlWithQueryParameters(endpoint, paginatedParams)
  }

  const { data, error, size, isValidating, setSize, mutate } = useSWRInfinite<
    ResponseType,
    Error
  >(
    getKey,
    async (endpoint: string) =>
      fetchWrapper<ResponseType>({
        method: FetchMethod.GET,
        endpoint,
        toBackend,
        jwt: getJwt ? await getJwt() : undefined,
      }),
    {
      ...config,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateFirstPage: true,
    },
  )

  const paginatedData = data
    ? data
        .filter((page) => page && page.contents)
        .flatMap((page) => page.contents)
    : []

  const isLoadingInitialData = !data && isValidating
  const isLoadingMore =
    isValidating && size > 0 && typeof data?.[size - 1] === 'undefined'

  const hasMore = data ? size !== pageSize : false

  return {
    data: paginatedData,
    error,
    size,
    isLoading: isLoadingInitialData,
    isLoadingMore,
    hasMore,
    setSize,
    refetch: mutate,
  }
}
