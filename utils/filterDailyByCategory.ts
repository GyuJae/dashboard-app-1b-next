import BigNumber from 'bignumber.js'
import { IDaily } from 'types/daily'
import { TDashBoardCategory } from 'types/dashBoardCategory'

interface IProps {
  daily: IDaily[]
  category: TDashBoardCategory
  weekly?: boolean
}

interface IOutput {
  x: string
  y: number
}

export const filterDailyByCategory = ({ daily, category, weekly = false }: IProps): IOutput[] => {
  if (weekly) {
    if (category !== 'sales')
      return daily.filter((_, index) => index % 7 === 0).map((item) => ({ x: item.date, y: item[category] }))
    return daily
      .filter((_, index) => index % 7 === 0)
      .map((item) => {
        const y = new BigNumber(item.roas).multipliedBy(item.cost).dividedBy(100).toNumber()
        return {
          x: item.date,
          y,
        }
      })
  }
  if (category !== 'sales') return daily.map((item) => ({ x: item.date, y: item[category] }))
  return daily.map((item) => {
    const y = new BigNumber(item.roas).multipliedBy(item.cost).dividedBy(100).toNumber()
    return {
      x: item.date,
      y,
    }
  })
}
