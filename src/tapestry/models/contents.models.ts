import { IPaginatedResponse, ISocialCounts } from './common.models'
import { IProfile } from './profiles.models'

export interface IContent {
  namespace: string
  created_at: number
  id: string
  // appNamespace: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRequestingProfileSocialInfo {}

// POST /contents/findOrCreate

export interface IFindOrCreateContentInput {
  id: string
  profileId: string
  properties: {
    key: string
    value: string
  }[]
}

// GET /contents

export interface IGetContentsResponse extends IPaginatedResponse {
  contents: {
    authorProfile: IProfile
    content: IContent
    socialCounts: ISocialCounts
    requestingProfileSocialInfo: IRequestingProfileSocialInfo
  }[]
}

// GET /contents/[id]

export interface IGetContentResponse {
  content: IContent
  socialCounts: ISocialCounts
}
