import { Chip, Divider, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import * as React from 'react'
import styled from 'styled-components'

import { PostTag } from '../../pages/posts/[id]'

const Headline = styled.div`
  margin: 15px 0;
`

export interface ArticleHeaderProps {
  tags?: PostTag[]
  title: string
  modifiedTime: number
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  modifiedTime,
  title,
  tags
}) => {
  const modifiedDateTime = Intl.DateTimeFormat('ja-JP').format(modifiedTime)
  const chips = tags?.map(tag => (
    <NextLink key={tag.name} href='/tags/[id]' as={`/tags/${tag.fileName}`} passHref>
      <Chip label={tag.name} />
    </NextLink>
  ))

  return (
    <header>
      <Headline>
        <Typography variant='h3' component='h1' style={{ marginBottom: '10px' }}>{title}</Typography>
        <Typography variant='subtitle2' component='p' style={{ marginBottom: '5px' }}>最終更新日: {modifiedDateTime}</Typography>
        {chips}
      </Headline>
      <Divider style={{ margin: '10px 0' }} />
    </header>
  )
}
