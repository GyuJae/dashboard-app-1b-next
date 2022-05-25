import { useRecoilValue } from 'recoil'
import styles from '@styles/components/Dashboard/DataFilterButtons/index.module.scss'
import dynamic from 'next/dynamic'

import { categoryState } from '@state/dashBoard'
import { categoryDict } from './categoryDict'

const DropdownButton = dynamic(() => import('./DropdownButton'))
const DataFilterButtons = () => {
  const { oneSelectCategory, twoSelectCategory, weekly } = useRecoilValue(categoryState)

  return (
    <div className={styles.addStatusChart}>
      <div className={styles.buttonSelectCont}>
        <div className={styles.leftSelectCont}>
          <DropdownButton buttonType='dataBtn1' buttonName={categoryDict[oneSelectCategory]} />
          <DropdownButton
            buttonType='dataBtn2'
            buttonName={twoSelectCategory ? categoryDict[twoSelectCategory] : '없음'}
          />
        </div>
        <DropdownButton buttonType='dateBtn' buttonName={weekly ? '주간' : '일별'} />
      </div>
    </div>
  )
}

export default DataFilterButtons
