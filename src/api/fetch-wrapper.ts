import { FetchMethod, IError } from './api.models'

export const getUrlWithQueryParameters = (
  endpoint: string | null,
  data?: Record<string, string>,
) => {
  const queryParameters = new URLSearchParams(data).toString()

  return `${endpoint}${!!queryParameters ? '?' + queryParameters : ''}`
}

export const getUrlWithPathParameters = ({
  endpoint,
  pathParams,
}: {
  endpoint: string
  pathParams?: Record<string, string>
}) => {
  if (!endpoint || !pathParams) {
    return endpoint
  }

  let updatedEndpoint = endpoint

  for (const [key, value] of Object.entries(pathParams)) {
    updatedEndpoint = updatedEndpoint.replace(`:${key}`, value.toString())
  }

  return updatedEndpoint
}

export const createURL = (domain: string, endpoint: string) => {
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
  data?: InputType
  toBackend?: boolean
  jwt?: string
  bypassCache?: boolean
  revalidate?: number
}

export const fetchWrapper = async <
  ResponseType = unknown,
  InputType = unknown,
>({
  method = FetchMethod.GET,
  endpoint,
  data,
  toBackend = true,
  jwt,
  bypassCache = false,
  revalidate,
}: FetchParams<InputType>): Promise<ResponseType> => {
  if (method === FetchMethod.GET && data) {
    endpoint = getUrlWithQueryParameters(endpoint, data)
  }

  const headers = {
    ...{
      'Content-Type': 'application/json',
    },
    ...(jwt && { Authorization: `Bearer ${jwt}` }),
  }

  const baseBeUrl = process.env.NEXT_PUBLIC_SERVER_URL || '/api'

  //console.log('---> baseBeUrl ', baseBeUrl)
  //console.log('---> finalUrl ', createURL(toBackend ? baseBeUrl : '', endpoint))

  const response = await fetch(
    createURL(toBackend ? baseBeUrl : '', endpoint),
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
          ? JSON.stringify(data)
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
