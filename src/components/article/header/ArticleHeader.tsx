import { Chip, Divider, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import * as React from 'react'

import { ArticleHeaderProps, ArticleHeadline } from '.'

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  modifiedTime,
  title,
  tags
}) => {
  const modifiedDateTime = Intl.DateTimeFormat('ja-JP').format(modifiedTime)
  const chips = tags?.map(tag => (
    <NextLink key={tag.name} href='/tags/[id]' as={`/tags/${tag.fileName}`} passHref>
      <Chip label={tag.name} clickable />
    </NextLink>
  ))

  return (
    <header>
      <ArticleHeadline>
        <Typography variant='h3' component='h1' style={{ marginBottom: '10px' }}>{title}</Typography>
        <Typography variant='subtitle2' component='p' style={{ marginBottom: '5px' }}>最終更新日: {modifiedDateTime}</Typography>
        {chips}
      </ArticleHeadline>
      <Divider style={{ margin: '10px 0' }} />
    </header>
  )
}
