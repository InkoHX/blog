import { Typography, ListItem, List, AppBar } from '@material-ui/core'
import styled from 'styled-components'

/** --- AppMenu --- */

export const StyledAppMenuList = styled(List)`
  width: 240px;
  flex-shrink: 0;
`

export const StyledAppMenuListItem = styled(ListItem)`
  padding: 12px 16px !important;
`

export const StyledAppMenuTitle = styled(Typography)`
  margin: 20px 0 !important;
`

/** --- AppBar --- */

export const StyledAppBarTitle = styled(Typography)`
  padding-left: 10px;
`

export const StyledAppBar = styled(AppBar)`
  width: 100%;
`
