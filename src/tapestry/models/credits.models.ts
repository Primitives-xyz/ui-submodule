// GET /shared/credits/balance

export interface IGetCreditsBalanceResponse {
  balance: number
}

// GET /shared/credits/bundles

export interface ICreditBundle {
  id: string
  name: string
  credits: number
  price: number
}
