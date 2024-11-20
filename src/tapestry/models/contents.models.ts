import { IPaginatedResponse, ISocialCounts } from './common.models'
import { IProfile } from './profiles.models'

export interface IContent {
  namespace: string
  created_at: number
  id: string
  // appNamespace: string
}

export interface IRequestingProfileSocialInfo {}

// POST /contents/findOrCreate

export interface IFindOrCreateContentInput {
  id: string
  profileId: string
  properties: [
    {
      key: string
      value: string
    },
  ]
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
