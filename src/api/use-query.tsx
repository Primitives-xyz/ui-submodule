import useSWR, { SWRConfiguration } from 'swr'
import { FetchMethod } from './api.models'
import {
  fetchWrapper,
  getUrlWithPathParameters,
  getUrlWithQueryParameters,
} from './fetch-wrapper'

interface UseQueryProps {
  endpoint: string
  pathParams?: Record<string, any>
  queryParams?: Record<string, any>
  skip?: boolean
  config?: SWRConfiguration
}

export function useQuery<ResponseType = any, Error = any>({
  endpoint: _endpoint,
  queryParams,
  pathParams,
  skip,
  config,
}: UseQueryProps) {
  const shouldFetch = !!_endpoint && !skip

  let endpoint = _endpoint

  if (shouldFetch) {
    endpoint = getUrlWithPathParameters({
      endpoint,
      pathParams,
    })
  }

  endpoint = getUrlWithQueryParameters(endpoint, queryParams)

  const { data, error, isLoading, mutate } = useSWR<ResponseType, Error>(
    shouldFetch ? endpoint : null,
    (endpoint: string) =>
      fetchWrapper<ResponseType>({
        method: FetchMethod.GET,
        endpoint,
      }),
    config,
  )

  return {
    data,
    error,
    loading: isLoading,
    refetch: mutate,
  }
}

export type { UseQueryProps }
