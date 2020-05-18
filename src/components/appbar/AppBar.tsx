import { AppBar as MaterialAppBar, Slide, Toolbar, Typography, useScrollTrigger } from '@material-ui/core'
import * as React from 'react'
import { AppMenuIcon } from '.'
import styled from 'styled-components'

const AppBarTitle = styled(Typography)`
  padding-left: 10px;
`

export const AppBar: React.FC = () => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      <MaterialAppBar color='inherit'>
        <Toolbar>
          <AppMenuIcon />
          <AppBarTitle variant='h6' variantMapping={{ h6: 'p' }}>InkoHX Blog</AppBarTitle>
        </Toolbar>
      </MaterialAppBar>
    </Slide>
  )
}
