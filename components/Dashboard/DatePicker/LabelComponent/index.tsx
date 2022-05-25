import { dateToKorean } from '@utils/dateToKorean'
import { dateState } from '@state/dashBoard'
import { useRecoilValue } from 'recoil'
import ArrowIcon from '@assets/svg/arrow.svg'

import styles from '@styles/components/Dashboard/DatePicker/Label/label.module.scss'
import Image from 'next/image'

interface IProps {
  handleToggleOpen: () => void
  inView: boolean
}

const LabelComponent = ({ handleToggleOpen, inView }: IProps) => {
  const dateRange = useRecoilValue(dateState)

  if (!inView) return null

  return (
    <div className={styles.dateInputContainer}>
      <label htmlFor='dateInput'>
        {`${dateToKorean(dateRange.startDate)} ~ ${dateToKorean(dateRange.endDate)}`}
        <div className={styles.imageContainer}>
          <Image src={ArrowIcon} width={12} height={12} alt='ArrowIcon' />
        </div>
      </label>
      <input id='dateInput' type='date' readOnly onClick={handleToggleOpen} />
    </div>
  )
}

export default LabelComponent
