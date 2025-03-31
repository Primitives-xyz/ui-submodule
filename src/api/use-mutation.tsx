'use client'

import useSWRMutation from 'swr/mutation'
import { FetchMethod } from './api.models'
import { fetchWrapper, getUrlWithQueryParameters } from './fetch-wrapper'

interface Props {
  endpoint: string
  method?: FetchMethod
  queryParams?: Record<string, string>
  getJwt?: () => Promise<string | undefined>
  toBackend?: boolean
}

export function useMutation<
  ResponseType = unknown,
  InputType = Record<string, unknown>,
  Error = unknown,
>({
  endpoint,
  method = FetchMethod.POST,
  queryParams,
  getJwt,
  toBackend = true,
}: Props) {
  endpoint = getUrlWithQueryParameters(endpoint, queryParams)

  const { data, error, isMutating, trigger } = useSWRMutation<
    ResponseType,
    Error,
    string | null,
    InputType
  >(endpoint, async (endpoint: string, args: { arg: InputType }) =>
    fetchWrapper<ResponseType, InputType>({
      method,
      endpoint,
      toBackend,
      body: args.arg,
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
