import { Variants, motion } from 'framer-motion'

import DataList from './DataList'
import RateContainer from './RateContainer'
import styles from '@styles/components/Dashboard/DailyMean/DailyMeanItem/dailyMeanItem.module.scss'

interface IProps {
  term: string
  value: string
  prevDiff: number
  unit: string
}

const variants: Variants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.3,
    },
  },
}

const DailyMeanItem = ({ term, value, prevDiff, unit }: IProps) => {
  return (
    <motion.div layout className={styles.wrapper}>
      <DataList term={term} value={value} unit={unit} variants={variants} />
      <RateContainer term={term} value={value} prevDiff={prevDiff} unit={unit} variants={variants} />
    </motion.div>
  )
}

export default DailyMeanItem
