import { CssBaseline, ThemeProvider as MaterialThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'

import { Footer, AppBar, Container } from '../components'
import { defaultTheme } from '../styles'

const ContainerInner = styled(Container)`
  min-height: 100vh;
`

const GATrackingScript: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') return null
  if (!process.env.GA_TRACKING_ID) return null

  return (
    <React.Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`} />
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_TRACKING_ID}');`
      }} />
    </React.Fragment>
  )
}

const GoogleAdSenseScript: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') return null
  if (!process.env.GOOGLE_ADSENSE_ID) return null

  return (
    <script data-ad-client={process.env.GOOGLE_ADSENSE_ID} async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
  )
}

const App: React.FC<AppProps> = (props) => {
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
        <GATrackingScript />
        <GoogleAdSenseScript />
      </Head>

      <StylesProvider injectFirst>
        <MaterialThemeProvider theme={defaultTheme}>
          <StyledThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar />
            <ContainerInner>
              <Component {...pageProps} />
            </ContainerInner>
            <Footer />
          </StyledThemeProvider>
        </MaterialThemeProvider>
      </StylesProvider>
    </React.Fragment>
  )
}

export default App
