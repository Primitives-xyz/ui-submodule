'use client'

import useSWRMutation from 'swr/mutation'
import { FetchMethod } from './api.models'
import { fetchWrapper } from './fetch-wrapper'

interface Props {
  endpoint: string
  method?: FetchMethod
  getJwt?: () => Promise<string | undefined>
}

export function useMutation<ResponseType = any, InputType = any, Error = any>({
  endpoint,
  method = FetchMethod.POST,
  getJwt,
}: Props) {
  const { data, error, isMutating, trigger } = useSWRMutation<
    ResponseType,
    Error,
    string | null,
    InputType
  >(endpoint, async (endpoint: string, args) =>
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
