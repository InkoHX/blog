import { Typography } from '@material-ui/core'
import * as React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'

const ErrorPageContainer = styled.div`
  height: 100vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const ErrorPage: React.FC = () => {
  return (
    <React.Fragment>
      <NextSeo
        noindex
        nofollow
        title='ページが存在しません'
      />

      <ErrorPageContainer>
        <Typography variant='h5'>404 | ページが見つかりませんでした。</Typography>
      </ErrorPageContainer>
    </React.Fragment>
  )
}

export default ErrorPage
