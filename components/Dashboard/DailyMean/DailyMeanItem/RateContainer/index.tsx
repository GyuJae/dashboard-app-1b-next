import { CaretDownIcon, CaretUpIcon } from '@assets/svg'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { cx } from 'styles'
import { numberToDot } from 'utils'
import styles from '@styles/components/Dashboard/DailyMean/DailyMeanItem/RateContainer/rateContainer.module.scss'

interface IProps {
  term: string
  value: string
  prevDiff: number
  unit: string
  variants: Variants
}

const RateContainer = ({ prevDiff, term, value, unit, variants }: IProps) => {
  return (
    <motion.div layout className={styles.rateContainer}>
      {isNaN(prevDiff) ? (
        <div>-</div>
      ) : (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={`${term}-${value}`}
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
            className={cx(styles.rateIcon, { [styles.minus]: prevDiff < 0 })}
          >
            {prevDiff >= 0 ? <CaretUpIcon /> : <CaretDownIcon />}
          </motion.div>
          <motion.div
            key={`${term}-${value}-${unit}`}
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
          >{`${numberToDot({ num: prevDiff })}${unit}`}</motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default RateContainer
