import { Typography } from '@material-ui/core'
import * as React from 'react'
import styled from 'styled-components'

const ErrorPageContainer = styled.div`
  height: 100vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const ErrorPage: React.FC = () => {
  return (
    <ErrorPageContainer>
      <Typography variant='h5'>404 | ページが見つかりませんでした。</Typography>
    </ErrorPageContainer>
  )
}

export default ErrorPage
