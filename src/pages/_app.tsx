import { AppProps } from 'next/app'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3'
  }
}

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
