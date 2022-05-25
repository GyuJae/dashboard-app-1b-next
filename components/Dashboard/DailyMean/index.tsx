import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { getDailyMean, numberToDot } from 'utils'

import styles from '@styles/components/Dashboard/DailyMean/dailyMean.module.scss'
import { useRecoilValue } from 'recoil'
import { datePrevSelector, dateState } from '@state/dashBoard'
import { IDaily } from 'types/daily'
import dynamic from 'next/dynamic'

const DailyMeanItem = dynamic(() => import('./DailyMeanItem'))

dayjs.extend(isBetween)

interface IProp {
  daily: IDaily[]
}

const DailyMean = ({ daily }: IProp) => {
  const { startDate, endDate } = useRecoilValue(dateState)
  const { prevStartDate, prevEndDate } = useRecoilValue(datePrevSelector)

  const filterDaily = daily.filter((day) => {
    const date = dayjs(day.date)
    return date.isBetween(startDate, endDate, 'date', '[]')
  })

  const filterPrevDaily = daily.filter((day) => {
    const date = dayjs(day.date)
    return date.isBetween(prevStartDate, prevEndDate, 'date', '[]')
  })

  const { roas, cost, imp, click, conv, sales } = getDailyMean(filterDaily)
  const {
    roas: prevRoas,
    cost: prevCost,
    imp: prevImp,
    click: prevClick,
    conv: prevConv,
    sales: prevSales,
  } = getDailyMean(filterPrevDaily)

  return (
    <div className={styles.wrapper}>
      <DailyMeanItem
        term='ROAS'
        value={`${numberToDot({ num: roas, fixed: 2 })}`}
        prevDiff={roas - prevRoas}
        unit='%'
      />
      <DailyMeanItem term='광고비' value={`${numberToDot({ num: cost })}`} prevDiff={cost - prevCost} unit='원' />
      <DailyMeanItem term='노출 수' value={`${numberToDot({ num: imp })}`} prevDiff={imp - prevImp} unit='회' />
      <DailyMeanItem term='클릭수' value={`${numberToDot({ num: click })}`} prevDiff={click - prevClick} unit='회' />
      <DailyMeanItem term='전환 수' value={`${numberToDot({ num: conv })}`} prevDiff={conv - prevConv} unit='회' />
      <DailyMeanItem term='매출' value={`${numberToDot({ num: sales })}`} prevDiff={sales - prevSales} unit='원' />
    </div>
  )
}

export default DailyMean
