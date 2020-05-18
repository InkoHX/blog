import styled from 'styled-components'
import { Paper, Typography } from '@material-ui/core'
import * as React from 'react'

const FooterInner = styled(Paper)`
  width: 100%;
  padding: 50px 30px;
  background-color: ${props => props.theme.palette.background.paper};
`

export const Footer: React.FC = () => {
  return (
    <FooterInner as='footer'>
      <Typography variant='body1' component='p'>MIT Licence | Copyright © 2020 InkoHX All rights reserved.</Typography>
    </FooterInner>
  )
}
