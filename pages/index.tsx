import type { NextPage } from 'next'
import { getDailyApi, getMediaApi } from 'services'
import useSWR, { SWRConfig } from 'swr'
import { IDailyResponse, IMediaResponse } from 'types/response'
import { IDaily } from 'types/daily'
import { IMedia } from 'types/media'
import dynamic from 'next/dynamic'
import styles from '@styles/pages/dashboard.module.scss'

const DailyMean = dynamic(() => import('@components/Dashboard/DailyMean'))
const DailyChart = dynamic(() => import('@components/Dashboard/DailyChart'))
const DatePicker = dynamic(() => import('@components/Dashboard/DatePicker'))
const MediaChannelGraph = dynamic(() => import('@components/Dashboard/MediaChannelGraph'))
const MediaChannelTable = dynamic(() => import('@components/Dashboard/MediaChannelTable'))
const DataFilterButtons = dynamic(() => import('@components/Dashboard/DataFilterButtons'))

interface IProps {
  daily: IDailyResponse
  media: IMediaResponse
}

const Home: NextPage = () => {
  const { data: dailyData } = useSWR<IDailyResponse>('daily')
  const { data: mediaData } = useSWR<IMediaResponse>('media')

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.h1}>대시보드</h1>
        <div className={styles.datePickerWrapper}>
          <DatePicker />
        </div>
      </div>
      <div className={styles.boardWrapper}>
        <h2 className={styles.h2}>통합 광고 현황</h2>
        <div className={styles.chartWrapper}>
          <DailyMean daily={dailyData?.daily as IDaily[]} />
          <DataFilterButtons />
          <DailyChart daily={dailyData?.daily as IDaily[]} />
        </div>
      </div>
      <div className={styles.boardWrapper}>
        <h2 className={styles.h2}>매체 현황</h2>
        <div className={styles.chartWrapper}>
          <MediaChannelGraph media={mediaData?.media as IMedia[]} />
          <MediaChannelTable media={mediaData?.media as IMedia[]} />
        </div>
      </div>
    </>
  )
}

const Page: NextPage<IProps> = ({ daily, media }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          daily,
          media,
        },
      }}
    >
      <Home />
    </SWRConfig>
  )
}

export async function getServerSideProps() {
  const daily = await getDailyApi()
  const media = await getMediaApi()
  return {
    props: {
      daily,
      media,
    },
  }
}

export default Page
