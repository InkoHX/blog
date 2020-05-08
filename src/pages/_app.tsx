import { AppProps } from 'next/app'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'

const theme = {
  colors: {
    primary: '#0070f3'
  }
}

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props
  return (
    <React.Fragment>
      <Reset />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
