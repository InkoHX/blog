import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Home, Menu, Label, Description } from '@material-ui/icons'
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

interface MenuIconButtonProps {
  title: string
  href: string
  label: string
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
  as?: string
}

const MenuIconButton: React.FC<MenuIconButtonProps> = ({
  href,
  title,
  label,
  as,
  children,
  onClick
}) => {
  return (
    <NextLink href={href} as={as} passHref>
      <ListItemInner button aria-label={label} onClick={onClick}>
        <ListItemIcon>
          {children}
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </ListItemInner>
    </NextLink>
  )
}

type MenuButtons = ReadonlyArray<Omit<MenuIconButtonProps, 'onClick' | 'label'> & { icon: JSX.Element }>

export const AppMenuIcon: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false)

  const menuButtons: MenuButtons = [
    {
      title: 'ホーム',
      href: '/',
      icon: <Home />
    },
    {
      title: '記事一覧',
      href: '/posts',
      icon: <Description />
    },
    {
      title: 'タグ一覧',
      href: '/tags',
      icon: <Label />
    }
  ]

  const menuButtonElements = menuButtons
    .map(value => (
      <MenuIconButton
        key={value.title}
        title={value.title}
        label={value.title}
        href={value.href}
        as={value.as}
        onClick={() => setOpen(false)}
      >
        {value.icon}
      </MenuIconButton>
    ))

  return (
    <React.Fragment>
      <IconButton aria-label='メニュー' onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer open={isOpen} onClose={() => setOpen(false)} anchor='left'>
        <AppMenuTitle variant='h6' variantMapping={{ h6: 'p' }} align='center'>InkoHX Blog</AppMenuTitle>
        <Divider />
        <ListInner>
          {menuButtonElements}
        </ListInner>
      </Drawer>
    </React.Fragment>
  )
}
