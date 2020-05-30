import { CssBaseline, ThemeProvider as MaterialThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { AdSenseScript, AnalyticsScript, AppBar, Container, Footer, ServiceWorkerUpdatePopup } from '../components'
import { defaultTheme } from '../styles'

const StyledContainer = styled(Container)`
  min-height: 100vh;
`

const App: NextPage<AppProps> = (props) => {
  const { Component, pageProps } = props
  const router = useRouter()

  return (
    <React.Fragment>
      <DefaultSeo
        twitter={{
          cardType: 'summary_large_image',
          site: '@InkoHX',
          handle: '@InkoHX'
        }}
        titleTemplate='%s | InkoHX Blog'
        openGraph={{
          locale: 'ja-JP',
          type: 'website',
          site_name: 'InkoHX Blog',
          url: `https://inkohx.me${router.asPath}`
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name='theme-color' content='#515151' />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel='apple-touch-icon' sizes='192x192' href='/images/icons/icon-192x192.png' />
        <link rel="manifest" href="/manifest.json" />
        <AnalyticsScript />
        <AdSenseScript />
      </Head>

      <StylesProvider injectFirst>
        <MaterialThemeProvider theme={defaultTheme}>
          <StyledThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar />
            <StyledContainer>
              <Component {...pageProps} />
            </StyledContainer>
            <ServiceWorkerUpdatePopup />
            <Footer />
          </StyledThemeProvider>
        </MaterialThemeProvider>
      </StylesProvider>
    </React.Fragment>
  )
}

export default App
