'use client'

import useSWR, { SWRConfiguration } from 'swr'
import { FetchMethod, IError } from './api.models'
import {
  fetchWrapper,
  getUrlWithPathParameters,
  getUrlWithQueryParameters,
} from './fetch-wrapper'

interface UseQueryProps {
  endpoint: string
  pathParams?: Record<string, string>
  queryParams?: Record<string, string>
  skip?: boolean
  config?: SWRConfiguration
  toBackend?: boolean
  bypassCache?: boolean
  getJwt?: () => Promise<string | undefined>
}

export function useQuery<ResponseType = unknown, Error = IError>({
  endpoint: _endpoint,
  queryParams,
  pathParams,
  skip,
  config,
  toBackend = true,
  bypassCache,
  getJwt,
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
    async (endpoint: string) =>
      fetchWrapper<ResponseType>({
        method: FetchMethod.GET,
        endpoint,
        toBackend,
        bypassCache,
        jwt: getJwt ? await getJwt() : undefined,
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
