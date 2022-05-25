import styles from '@styles/components/Dashboard/DataFilterButtons/DropdownList/dropdownList.module.scss'
import OneDropDownList from './OneDropDownList'
import TwoDropDownList from './TwoDropDownList'
import WeeklyDownList from './WeeklyDownList'

interface IProps {
  buttonType: 'dataBtn1' | 'dataBtn2' | 'dateBtn'
}

const DropdownList = ({ buttonType }: IProps) => {
  return (
    <ul className={styles.selectList}>
      <OneDropDownList inView={buttonType === 'dataBtn1'} />
      <TwoDropDownList inView={buttonType === 'dataBtn2'} />
      <WeeklyDownList inView={buttonType === 'dateBtn'} />
    </ul>
  )
}

export default DropdownList
