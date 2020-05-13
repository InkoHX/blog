import { CssBaseline, ThemeProvider as MaterialThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { Footer } from '../components'
import { defaultTheme } from '../styles'

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props

  return (
    <React.Fragment>
      <Head>
        <title>InkoHX | Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <StylesProvider injectFirst>
        <MaterialThemeProvider theme={defaultTheme}>
          <StyledThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Component {...pageProps} />
            <Footer />
          </StyledThemeProvider>
        </MaterialThemeProvider>
      </StylesProvider>
    </React.Fragment>
  )
}

export default App
