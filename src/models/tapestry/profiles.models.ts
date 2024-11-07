export interface IProfile {
  id: string
  created_at: number
  username: string
  bio: string
  image: string
}

// POST /profiles/findOrCreate

export interface IFindOrCreateProfileInput {
  username: string
  blockchain: string
  execution: string
  walletAddress: string
  id: string
  image: string
  bio: string
}

export interface IFindOrCreateProfileResponse {
  profile: IProfile
  walletAddress: string
}

// GET /profiles

export interface IGetProfilesResponse {
  profiles: IProfile[]
}

// GET /profiles/:id

export interface IGetProfileResponse {
  profile: IProfile
  walletAddress: string
  socialCounts: ISocialCounts
}

export interface ISocialCounts {
  followers: number
  following: number
}

// PUT /profiles/:id

export interface IUpdateProfileInput {
  username: string
  bio: string
  image: string
  execution: string
}

export type IUpdateProfileResponse = IProfile

// GET /profiles/:id/followers
