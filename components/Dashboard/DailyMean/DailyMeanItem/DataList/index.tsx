import { AnimatePresence, motion, Variants } from 'framer-motion'

interface IProps {
  term: string
  value: string
  variants: Variants
  unit: string
}

const DataList = ({ term, value, variants, unit }: IProps) => {
  return (
    <motion.dl layout>
      <motion.dt layout>{term}</motion.dt>
      <AnimatePresence exitBeforeEnter>
        <motion.dd key={`${term}-${value}`} variants={variants} initial='initial' animate='animate' exit='exit'>
          {`${value}${unit}`}
        </motion.dd>
      </AnimatePresence>
    </motion.dl>
  )
}

export default DataList
