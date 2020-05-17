import { IconButton } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import NextLink from 'next/link'
import * as React from 'react'

export const HomeIconButton: React.FC = () => {
  return (
    <NextLink href='/'>
      <IconButton color='inherit'>
        <Home />
      </IconButton>
    </NextLink>
  )
}
