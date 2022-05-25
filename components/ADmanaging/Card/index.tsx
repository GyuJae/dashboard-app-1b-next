import { IAdType, IConversionAdType } from 'types/adType'
import { converter } from '@utils/formatConversion'
import styles from '@styles/components/ADmanaging/Card/card.module.scss'

interface Props {
  item: IAdType
}

const Card = ({ item }: Props) => {
  const data: IConversionAdType = converter(item)

  const { title, status, date, budget, roas, convValue, cost } = data

  return (
    <li className={styles.card}>
      <h2>{`${title}`}</h2>

      <dl className={styles.dataBox}>
        <div>
          <dt>상태</dt>
          <dd>{status}</dd>
        </div>
        <div>
          <dt>광고 생성일</dt>
          <dd>{date}</dd>
        </div>
        <div>
          <dt>일 희망 예산</dt>
          <dd>{budget}원</dd>
        </div>
        <div>
          <dt>광고 수익율</dt>
          <dd>{roas}%</dd>
        </div>
        <div>
          <dt>매출</dt>
          <dd>{convValue}원</dd>
        </div>
        <div>
          <dt>광고 비용</dt>
          <dd>{cost}원</dd>
        </div>
      </dl>

      <div>
        <button type='button'>수정하기</button>
      </div>
    </li>
  )
}

export default Card
