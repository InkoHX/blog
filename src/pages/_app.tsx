import { AppProps } from 'next/app'
import * as React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Reset } from 'styled-reset'
import Head from 'next/head'

const theme = {
  colors: {
    primary: '#0070f3'
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Source Code Pro', monospace;
  }
`

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props
  return (
    <React.Fragment>
      <Head>
        <title>InkoHX | Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <Reset />

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
