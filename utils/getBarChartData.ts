import { IMedia } from 'types/media'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { cloneDeep, groupBy } from 'lodash'

interface IProps {
  startDate: string
  endDate: string
}

type TData = Record<
  string,
  {
    click: number
    convValue: number
    cost: number
    cpa: number
    cpc: number
    ctr: number
    cvr: number
    imp: number
    roas: number
  }
>

const COMPANIES = ['facebook', 'google', 'kakao', 'naver']
const CATEGORYS = ['광고비', '매출', '노출수', '클릭수', '전환수']

export const getBarChartData = (recoilDate: IProps, data: IMedia[]) => {
  const dataStructure = {
    click: 0,
    convValue: 0,
    cost: 0,
    cpa: 0,
    cpc: 0,
    ctr: 0,
    cvr: 0,
    imp: 0,
    roas: 0,
  }
  const groupByData = groupBy(data, 'channel')
  const filterData: TData = {
    facebook: cloneDeep(dataStructure),
    google: cloneDeep(dataStructure),
    kakao: cloneDeep(dataStructure),
    naver: cloneDeep(dataStructure),
  }
  COMPANIES.forEach((category) => {
    groupByData[category].forEach((v) => {
      const date = new Date(v.date)
      const target = filterData[category]
      if (dayjs(date).isBetween(recoilDate.startDate, recoilDate.endDate)) {
        target.click = new BigNumber(target.click).plus(v.click).toNumber()
        target.convValue = new BigNumber(target.convValue).plus(v.convValue).toNumber()
        target.cost = new BigNumber(target.cost).plus(v.cost).toNumber()
        target.cpa = new BigNumber(target.cpa).plus(v.cpa).toNumber()
        target.cpc = new BigNumber(target.cpc).plus(v.cpc).toNumber()
        target.ctr = new BigNumber(target.ctr).plus(v.ctr).toNumber()
        target.imp = new BigNumber(target.imp).plus(v.imp).toNumber()
        target.roas = new BigNumber(target.roas).plus(v.roas).toNumber()
      }
    })
  })
  const sum = {
    costSum: 0,
    salesSum: 0,
    impSum: 0,
    clickSum: 0,
    convSum: 0,
  }

  const chartData: { category: string; value: number }[][] = []

  COMPANIES.forEach((company) => {
    groupByData[company].forEach((v) => {
      const selectDate = new Date(v.date)
      const startDate = new Date(recoilDate.startDate)
      const endDate = new Date(recoilDate.endDate)
      const target = filterData[company]

      if (startDate <= selectDate && selectDate <= endDate) {
        target.click = new BigNumber(target.click).plus(v.click).toNumber()
        target.convValue = new BigNumber(target.convValue).plus(v.convValue).toNumber()
        target.cost = new BigNumber(target.cost).plus(v.cost).toNumber()
        target.cpa = new BigNumber(target.cpa).plus(v.cpa).toNumber()
        target.cpc = new BigNumber(target.cpc).plus(v.cpc).toNumber()
        target.ctr = new BigNumber(target.ctr).plus(v.ctr).toNumber()
        target.imp = new BigNumber(target.imp).plus(v.imp).toNumber()
        target.roas = new BigNumber(target.roas).plus(v.roas).toNumber()
      }
    })
  })

  COMPANIES.forEach((company) => {
    const target = filterData[company]
    const sales = new BigNumber(target.roas).multipliedBy(target.cost).div(100).toNumber()
    const conv = new BigNumber(target.click).multipliedBy(target.roas).toNumber()

    sum.costSum = new BigNumber(sum.costSum).plus(target.cost).toNumber()
    sum.salesSum = Math.floor(new BigNumber(sum.salesSum).plus(sales).toNumber())
    sum.impSum = new BigNumber(sum.impSum).plus(target.imp).toNumber()
    sum.clickSum = new BigNumber(sum.clickSum).plus(target.click).toNumber()
    sum.convSum = Math.floor(new BigNumber(sum.convSum).plus(conv).toNumber())
  })

  COMPANIES.forEach((company) => {
    const target = filterData[company]
    const sales = new BigNumber(target.roas).multipliedBy(target.cost).div(100).toNumber()
    const conv = new BigNumber(target.click).multipliedBy(target.roas).toNumber()

    const costPercentage = Math.floor((target.cost * 100) / sum.costSum)
    const salesPercentage = Math.floor((sales * 100) / sum.salesSum)
    const impPercentage = Math.floor((target.imp * 100) / sum.impSum)
    const clickPercentage = Math.floor((target.click * 100) / sum.clickSum)
    const convPercentage = Math.floor((conv * 100) / sum.convSum)

    chartData.push([
      { category: CATEGORYS[0], value: costPercentage },
      { category: CATEGORYS[1], value: salesPercentage },
      { category: CATEGORYS[2], value: impPercentage },
      { category: CATEGORYS[3], value: clickPercentage },
      { category: CATEGORYS[4], value: convPercentage },
    ])
  })

  return { sum, chartData }
}
