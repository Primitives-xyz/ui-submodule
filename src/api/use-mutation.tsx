'use client'

import useSWRMutation from 'swr/mutation'
import { FetchMethod } from './api.models'
import { fetchWrapper, getUrlWithQueryParameters } from './fetch-wrapper'

interface Props {
  endpoint: string
  method?: FetchMethod
  queryParams?: Record<string, string>
  getJwt?: () => Promise<string | undefined>
}

export function useMutation<ResponseType = unknown, InputType = unknown, Error = unknown>({
  endpoint,
  method = FetchMethod.POST,
  queryParams,
  getJwt,
}: Props) {
  endpoint = getUrlWithQueryParameters(endpoint, queryParams)

  const { data, error, isMutating, trigger } = useSWRMutation<
    ResponseType,
    Error,
    string | null,
    InputType
  >(endpoint, async (endpoint: string, args: {arg: unknown}) =>
    fetchWrapper<ResponseType>({
      method,
      endpoint,
      data: args.arg,
      jwt: getJwt ? await getJwt() : undefined,
    }),
  )

  return {
    data,
    error,
    loading: isMutating,
    mutate: trigger,
  }
}
