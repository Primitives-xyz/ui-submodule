import { FetchMethod, IError } from './api.models'

export const getUrlWithQueryParameters = <InputType = Record<string, unknown>>(
  endpoint: string | null,
  data?: InputType,
) => {
  const parsedData = data as Record<string, string>
  const queryParameters = new URLSearchParams(parsedData).toString()

  return `${endpoint}${!!queryParameters ? '?' + queryParameters : ''}`
}

export const getUrlWithPathParameters = ({
  endpoint,
  pathParams,
}: {
  endpoint: string
  pathParams?: Record<string, unknown>
}) => {
  if (!endpoint || !pathParams) {
    return endpoint
  }
  const parsedParams = pathParams as Record<string, string>

  let updatedEndpoint = endpoint

  for (const [key, value] of Object.entries(parsedParams)) {
    updatedEndpoint = updatedEndpoint.replace(`:${key}`, value.toString())
  }

  return updatedEndpoint
}

export const createURL = ({
  domain,
  endpoint,
}: {
  domain: string
  endpoint: string
}) => {
  domain = domain.replace(/\/+$/, '')
  endpoint = endpoint.replace(/^\/+|\/+$/g, '')

  if (!domain) {
    return endpoint
  }

  return domain + '/' + endpoint
}

interface FetchParams<InputType> {
  method?: FetchMethod
  endpoint: string
  queryParams?: Record<string, string>
  body?: InputType
  toBackend?: boolean
  jwt?: string
  bypassCache?: boolean
  revalidate?: number
}

export const fetchWrapper = async <
  ResponseType = unknown,
  InputType = Record<string, unknown>,
>({
  method = FetchMethod.GET,
  endpoint,
  queryParams,
  body,
  toBackend = true,
  jwt,
  bypassCache = false,
  revalidate,
}: FetchParams<InputType>): Promise<ResponseType> => {
  if (queryParams) {
    endpoint = getUrlWithQueryParameters<Record<string, string>>(
      endpoint,
      queryParams,
    )
  }

  const headers = {
    ...{
      'Content-Type': 'application/json',
    },
    ...(jwt && { Authorization: `Bearer ${jwt}` }),
  }

  const baseBeUrl = process.env.NEXT_PUBLIC_SERVER_URL || '/api'

  // console.log(
  //   '---> finalUrl ',
  //   createURL({
  //     domain: toBackend ? baseBeUrl : '',
  //     endpoint,
  //   }),
  // )

  const response = await fetch(
    createURL({
      domain: toBackend ? baseBeUrl : '',
      endpoint,
    }),
    {
      method,
      headers,
      ...(bypassCache ? { cache: 'no-store' } : {}),
      // @ts-ignore
      next: {
        revalidate,
      },
      // mode: 'no-cors',
      body:
        method === FetchMethod.POST || method === FetchMethod.PUT
          ? JSON.stringify(body)
          : undefined,
    },
  )

  if (!response.ok) {
    const error: IError = {
      info: await response.json(),
      status: response.status,
    }

    throw error
  } else {
    try {
      const data = await response.json()

      return data
    } catch (error) {
      console.log(error)

      return null as ResponseType
    }
  }
}

export type { FetchParams }
