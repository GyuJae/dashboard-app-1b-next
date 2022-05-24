import type { NextPage } from 'next'
import { getDailyApi } from 'services'
import styles from 'styles/pages/Home.module.scss'
import useSWR, { SWRConfig } from 'swr'
import { IDailyResponse } from 'types/response'

interface IProps {
  data: IDailyResponse
}

const Home: NextPage = () => {
  const { data } = useSWR<IDailyResponse>('daily')

  return (
    <div className={styles.wrapper}>
      {data?.daily?.map((day) => (
        <div key={day.date}>{day.date}</div>
      ))}
    </div>
  )
}

const Page: NextPage<IProps> = ({ data }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          daily: data,
        },
      }}
    >
      <Home />
    </SWRConfig>
  )
}

export async function getServerSideProps() {
  const data = await getDailyApi()
  return {
    props: {
      data,
    },
  }
}

export default Page
