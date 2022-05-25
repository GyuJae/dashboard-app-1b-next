import { useEffect, useState } from 'react'
import styles from '@styles/components/loadingPage/loadingPage.module.scss'
import { SpinnerIcon } from '@assets/svg'
import { useRouter } from 'next/router'

const LoadingPage = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const { pathname } = useRouter()
  useEffect(() => {
    setIsFetching(true)

    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  }, [pathname])

  if (!isFetching) return null

  return (
    <div className={styles.wrapper}>
      <div>
        <SpinnerIcon />
      </div>
    </div>
  )
}

export default LoadingPage
