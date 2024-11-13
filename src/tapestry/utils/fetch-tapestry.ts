import { createURL, FetchParams, fetchWrapper } from '../../api/fetch-wrapper'

export const fetchTapestry = async <ResponseType = unknown, InputType = Record<string, unknown>>(
  args: FetchParams<InputType>,
): Promise<ResponseType> => {
  if (!process.env.TAPESTRY_URL) {
    throw new Error('Missing env var TAPESTRY_URL')
  }

  const endpoint = `${args.endpoint}?apiKey=${process.env.TAPESTRY_API_KEY}`

  return fetchWrapper({
    ...args,
    endpoint: createURL({
      domain: process.env.TAPESTRY_URL,
      endpoint,
    }),
    toBackend: false,
  })
}
