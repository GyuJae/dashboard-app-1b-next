import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(`https://wanted-madup.herokuapp.com/${url}`).then((response) => response.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
