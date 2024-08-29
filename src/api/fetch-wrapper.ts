import { FetchMethod } from './api.models'

export const getUrlWithQueryParameters = (
  endpoint: string | null,
  data?: Record<string, any>,
) => {
  const queryParameters = new URLSearchParams(data).toString()

  return `${endpoint}${!!queryParameters ? '?' + queryParameters : ''}`
}

export const getUrlWithPathParameters = ({
  endpoint,
  pathParams,
}: {
  endpoint: string
  pathParams?: Record<string, any>
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

const createURL = (domain: string, endpoint: string) => {
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
  backendJwt?: string
  bypassCache?: boolean
  revalidate?: number
}

export const fetchWrapper = async <ResponseType = any, InputType = any>({
  method = FetchMethod.GET,
  endpoint,
  data,
  toBackend = true,
  backendJwt,
  bypassCache = false,
  revalidate,
}: FetchParams<InputType>): Promise<ResponseType> => {
  if (method === FetchMethod.GET && data) {
    endpoint = getUrlWithQueryParameters(endpoint, data)
  }

  const headers = {
    ...{
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    },
    ...(backendJwt && { Authorization: `Bearer ${backendJwt}` }),
  }

  const baseBeUrl = process.env.NEXT_PUBLIC_SERVER_URL || '/api'

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
      body:
        method === FetchMethod.POST || method === FetchMethod.PUT
          ? JSON.stringify(data)
          : undefined,
    },
  )

  if (!response.ok) {
    // error handling
    const data = await response.json()
    console.error(`Error fetching ${endpoint}`, data)

    throw data
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
