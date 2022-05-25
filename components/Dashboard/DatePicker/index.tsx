import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { dateState } from '@state/dashBoard'
import { RangeKeyDict } from 'react-date-range'
import dynamic from 'next/dynamic'

import styles from '@styles/components/Dashboard/DatePicker/datePicker.module.scss'

import { useClickAway } from 'utils'
import { cx } from 'styles'

const LabelComponent = dynamic(() => import('./LabelComponent'))
const DateRange = dynamic(() => import('./DateRange'))

const DAY_FORMAT = 'YYYY-MM-DD'

const DatePicker = () => {
  const setDateRange = useSetRecoilState(dateState)
  const [open, setOpen] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const handleToggleOpen = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)

  const handleChange = ({ selection: { startDate, endDate } }: RangeKeyDict) => {
    setDateRange({
      startDate: dayjs(startDate).format(DAY_FORMAT),
      endDate: dayjs(endDate).format(DAY_FORMAT),
    })
  }

  useClickAway(containerRef, handleClose)

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperOpen]: open })}>
      <LabelComponent handleToggleOpen={handleToggleOpen} inView={!open} />
      <DateRange containerRef={containerRef} handleChange={handleChange} inView={open} />
    </div>
  )
}

export default DatePicker
