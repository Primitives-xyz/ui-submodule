import { createURL, FetchParams, fetchWrapper } from '../../api/fetch-wrapper'

export const fetchTapestry = async <
  ResponseType = unknown,
  InputType = Record<string, unknown>,
>(
  args: FetchParams<InputType>,
): Promise<ResponseType> => {
  if (!process.env.PROTOCOL_SERVER_URL) {
    throw new Error('Missing env var PROTOCOL_SERVER_URL')
  }

  if (!process.env.PROTOCOL_API_KEY) {
    throw new Error('Missing env var PROTOCOL_API_KEY')
  }

  const url = createURL({
    domain: process.env.PROTOCOL_SERVER_URL,
    endpoint: args.endpoint,
  })

  return fetchWrapper({
    ...args,
    endpoint: url,
    queryParams: {
      ...args.queryParams,
      apiKey: process.env.PROTOCOL_API_KEY,
    },
    toBackend: false,
  })
}
