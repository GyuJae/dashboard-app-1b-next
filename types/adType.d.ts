export interface IAdType {
  adType: string
  budget: number
  endDate: string | null
  id: number
  report: { cost: number; convValue: number; roas: number }
  startDate: string
  status: string
  title: string
}
export interface IConversionAdType {
  title: string
  status: string
  date: string
  budget: string
  roas: string
  convValue: string
  cost: string
}
