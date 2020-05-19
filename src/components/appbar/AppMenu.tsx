import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core'
import { Home, Menu } from '@material-ui/icons'
import NextLink from 'next/link'
import * as React from 'react'
import styled from 'styled-components'

const ListInner = styled(List)`
  width: 240px;
  flex-shrink: 0;
`

const ListItemInner = styled(ListItem)`
  padding: 12px 16px !important;
`

const AppMenuTitle = styled(Typography)`
  margin: 20px 0 !important;
`

export const AppMenuIcon: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <IconButton aria-label='メニュー' onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer open={isOpen} onClose={() => setOpen(false)} anchor='left'>
        <AppMenuTitle variant='h6' variantMapping={{ h6: 'p' }} align='center'>InkoHX Blog</AppMenuTitle>
        <Divider />
        <ListInner>
          <NextLink href='/' passHref>
            <ListItemInner button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>ホーム</ListItemText>
            </ListItemInner>
          </NextLink>
        </ListInner>
      </Drawer>
    </React.Fragment>
  )
}
