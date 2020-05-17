import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import NextLink from 'next/link'
import * as React from 'react'
import styled from 'styled-components'

export interface ArticleItem {
  fileName: string
  title: string
  description: string
}

export interface ArticleListProps {
  type: 'tag' | 'post'
  items: ArticleItem[]
}

const TableContainerInner = styled(TableContainer)`
  margin: 30px auto;
  background-color: ${props => props.theme.palette.background.paper};
`

const TableRowInner = styled(TableRow)`
  cursor: pointer;
`

export const ArticleList: React.FC<ArticleListProps> = ({
  type,
  items
}) => {
  const articleItems = React.useMemo(() => items.map(item => {
    return {
      path: `/${type}s/${item.fileName}`,
      description: item.description,
      title: item.title
    }
  }), [type, items])
  const rows = articleItems.map(item => (
    <NextLink key={item.path} href={`/${type}s/[id]`} as={item.path} passHref>
      <TableRowInner hover>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.description}</TableCell>
      </TableRowInner>
    </NextLink>
  ))

  return (
    <TableContainerInner>
      <Table>
        <TableHead>
          <TableCell>{type === 'tag' ? 'タグ' : '記事'}</TableCell>
          <TableCell>説明</TableCell>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainerInner>
  )
}
