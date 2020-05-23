import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import * as React from 'react'
import styled from 'styled-components'

export interface ArticleItem {
  fileName: string
  title: string
  description: string,
  modifiedDate: number
}

export interface ArticleListProps {
  type: 'tag' | 'post'
  items: ArticleItem[]
}

const CardInner = styled(Card)`
  height: 230px;
`

const ArticleListContainer = styled.div`
  margin: 30px auto;
`

export const ArticleList: React.FC<ArticleListProps> = ({
  type,
  items
}) => {
  const articleItems = React.useMemo(() => items.map(item => {
    return {
      path: `/${type}s/${item.fileName}`,
      description: item.description,
      title: item.title,
      modifiedDate: Intl.DateTimeFormat('ja-JP').format(item.modifiedDate)
    }
  }), [type, items])

  const articleCards = articleItems.map(value => (
    <Grid key={value.description} item xs={12} sm={4}>
      <NextLink href={`/${type}s/[id]`} as={value.path} passHref>
        <CardActionArea>
          <CardInner>
            <CardHeader
              subheader={value.modifiedDate}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">{value.title}</Typography>
              <Typography variant='body2'>{value.description}</Typography>
            </CardContent>
          </CardInner>
        </CardActionArea>
      </NextLink>
    </Grid >
  ))

  return (
    <ArticleListContainer>
      <Typography gutterBottom variant='h4' align='center' component='h1'>{type === 'post' ? '記事' : 'タグ'}</Typography>
      <Grid container spacing={3} alignItems='center' justify='center'>
        {articleCards}
      </Grid>
    </ArticleListContainer>
  )
}
