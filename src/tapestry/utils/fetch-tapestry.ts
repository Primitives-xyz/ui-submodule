import { createURL, FetchParams, fetchWrapper } from '../../api/fetch-wrapper'

export const fetchTapestry = async <
  ResponseType = unknown,
  InputType = Record<string, unknown>,
>(
  args: FetchParams<InputType>,
): Promise<ResponseType> => {
  // do a check to make sure were not in the browser
  // if (typeof window !== 'undefined') {
  //   return {} as ResponseType
  // }

  // if (!process.env.TAPESTRY_URL) {
  //   throw new Error('Missing env var TAPESTRY_URL')
  // }

  // if (!process.env.TAPESTRY_API_KEY) {
  //   throw new Error('Missing env var TAPESTRY_API_KEY')
  // }

  const TAPESTRY_URL =
    process.env.TAPESTRY_URL ?? 'https://tapestry-server-dev.fly.dev/api/v1'
  const TAPESTRY_API_KEY =
    process.env.TAPESTRY_URL ?? '37d68b80-8bfa-4608-ae2a-b3ec575567b2	'

  return fetchWrapper({
    ...args,
    endpoint: createURL({
      domain: TAPESTRY_URL,
      endpoint: args.endpoint,
    }),
    queryParams: {
      ...args.queryParams,
      apiKey: TAPESTRY_API_KEY,
    },
    toBackend: false,
  })
}
