import { Divider, Drawer, IconButton, ListItemIcon, ListItemText, Slide, Toolbar, useScrollTrigger } from '@material-ui/core'
import { Description, Home, Label, Menu } from '@material-ui/icons'
import NextLink from 'next/link'
import * as React from 'react'

import {
  MenuButtonProps,
  StyledAppBar,
  StyledAppBarTitle,
  StyledAppMenuList,
  StyledAppMenuListItem,
  StyledAppMenuTitle
} from '.'

const menuButtonProps: MenuButtonProps[] = [
  {
    name: 'ホーム',
    href: '/',
    icon: <Home />
  },
  {
    name: '記事一覧',
    href: '/posts',
    icon: <Description />
  },
  {
    name: 'タグ一覧',
    href: '/tags',
    icon: <Label />
  }
]

const AppMenuIcon: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false)

  const appMenuButtons = menuButtonProps
    .map(props => (
      <NextLink href={props.href} as={props.as} key={props.name} passHref>
        <StyledAppMenuListItem button aria-label={props.name} onClick={() => setOpen(false)}>
          <ListItemIcon>{props.icon}</ListItemIcon>
          <ListItemText>{props.name}</ListItemText>
        </StyledAppMenuListItem>
      </NextLink>
    ))

  return (
    <React.Fragment>
      <IconButton aria-label='メニュー' onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer open={isOpen} onClose={() => setOpen(false)} anchor='left'>
        <StyledAppMenuTitle variant='h6' variantMapping={{ h6: 'p' }} align='center'>InkoHX Blog</StyledAppMenuTitle>
        <Divider />
        <StyledAppMenuList>
          {appMenuButtons}
        </StyledAppMenuList>
      </Drawer>
    </React.Fragment>
  )
}

export const AppBar: React.FC = () => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      <StyledAppBar color='inherit'>
        <Toolbar>
          <AppMenuIcon />
          <StyledAppBarTitle variant='h6' variantMapping={{ h6: 'p' }}>InkoHX Blog</StyledAppBarTitle>
        </Toolbar>
      </StyledAppBar>
    </Slide>
  )
}
