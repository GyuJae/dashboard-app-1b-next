export type TCompany = 'google' | 'facebook' | 'naver' | 'kakao'

export interface IChannel {
  channel: TCompany
  date: string
  imp: number
  click: number
  cost: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
}
