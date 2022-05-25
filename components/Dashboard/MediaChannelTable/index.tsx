import BigNumber from 'bignumber.js'
import { useRecoilValue } from 'recoil'
import { dateState } from '@state/dashBoard'
import { getMediaData, numberToDot } from 'utils'
import { companyKRDict, ICompanyKRDict } from './companyKRDict'
import styles from '@styles/components/Dashboard/MediaChannelTable/mediaChannelTable.module.scss'
import { IMedia } from 'types/media'

interface IProps {
  media: IMedia[]
}

const header = ['', '광고비', '매출', 'ROAS', '노출수', '클릭 수 ', '클릭률 (CTR)', '클릭당비용 (CPC)']
const COMPANIES = ['google', 'facebook', 'kakao', 'naver', 'all']

const MediaChannelTable = ({ media }: IProps) => {
  const { startDate, endDate } = useRecoilValue(dateState)
  const data = getMediaData({ startDate, endDate, media })
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            {header.map((headerName, index) => {
              const key = `${headerName}-${index}`
              return <th key={key}>{headerName}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {COMPANIES.map((company, index) => {
            const key = `${company}-${index}`
            const sales = new BigNumber(data[company].cost).multipliedBy(data[company].roas).dividedBy(100).toNumber()
            return (
              <tr key={key}>
                <td>{companyKRDict[company as keyof ICompanyKRDict]}</td>
                <td>{numberToDot({ num: data[company].cost })}</td>
                <td>
                  {numberToDot({
                    num: sales,
                  })}
                </td>
                <td>{numberToDot({ num: data[company].roas })}</td>
                <td>{numberToDot({ num: data[company].imp })}</td>
                <td>{numberToDot({ num: data[company].click })}</td>
                <td>{numberToDot({ num: data[company].ctr })}</td>
                <td>{numberToDot({ num: data[company].cpc })}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MediaChannelTable
