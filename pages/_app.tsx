import React from 'react'

import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { RecoilRoot } from 'recoil'
import '@styles/globals.scss'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('components/Layout'))

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(`https://wanted-madup.herokuapp.com/${url}`).then((response) => response.json()),
      }}
    >
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SWRConfig>
  )
}

export default MyApp
