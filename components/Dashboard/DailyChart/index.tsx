import { useRecoilValue } from 'recoil'
import { categoryState, dateState } from '@state/dashBoard'

import dayjs from 'dayjs'
import { filterDailyByCategory, unitPicker } from '@utils/index'

import styles from '@styles/components/Dashboard/DailyChart/dailyChart.module.scss'
import { IDaily } from 'types/daily'
import dynamic from 'next/dynamic'

const TwoDataChart = dynamic(() => import('./TwoDataChart'))
const OneDataChart = dynamic(() => import('./OneDataChart'))

interface IProp {
  daily: IDaily[]
}

const DailyChart = ({ daily }: IProp) => {
  const { startDate, endDate } = useRecoilValue(dateState)
  const filterDaily = daily.filter((day) => {
    const date = dayjs(day.date)
    return date.isBetween(startDate, endDate, 'date', '[]')
  })

  const { oneSelectCategory, twoSelectCategory, weekly } = useRecoilValue(categoryState)

  const data = [filterDailyByCategory({ daily: filterDaily, category: oneSelectCategory, weekly })]

  if (twoSelectCategory) {
    data.push(filterDailyByCategory({ daily: filterDaily, category: twoSelectCategory, weekly }))
  }

  const unit = [unitPicker(oneSelectCategory), unitPicker(twoSelectCategory)]

  return (
    <div className={styles.wrapper}>
      <TwoDataChart
        data={data}
        unit={unit}
        inView={Boolean(twoSelectCategory) && oneSelectCategory !== twoSelectCategory}
      />
      <OneDataChart
        data={data[0]}
        unit={unit[0]}
        inView={!twoSelectCategory || oneSelectCategory === twoSelectCategory}
      />
    </div>
  )
}

export default DailyChart
