import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import * as React from 'react'
import styled from 'styled-components'

export interface ArticleItem {
  fileName: string
  hash: string
  title: string
  description: string
  modifiedDate: number
}

export type ArticlePostItem = Omit<ArticleItem, 'fileName'>

export type ArticleTagItem = Omit<ArticleItem, 'hash'>

export interface ArticlePostListProps {
  type: 'posts'
  items: ArticlePostItem[]
}

export interface ArticleTagListProps {
  type: 'tags'
  items: ArticleTagItem[]
}

export type ArticleListProps = ArticlePostListProps | ArticleTagListProps

const CardInner = styled(Card)`
  height: 230px;
`

const ArticleListContainer = styled.div`
  margin: 30px auto;
`

const getArticlePostItems = (item: ArticlePostItem): Omit<ArticlePostItem, 'hash' | 'modifiedDate'> & Record<'as' | 'href' | 'modifiedDate', string> => {
  return {
    href: '/posts/[id]',
    as: `/posts/${item.hash}`,
    title: item.title,
    description: item.description,
    modifiedDate: Intl.DateTimeFormat('ja-JP').format(item.modifiedDate)
  }
}

const getArticleTagItems = (item: ArticleTagItem): Omit<ArticleTagItem, 'fileName' | 'modifiedDate'> & Record<'as' | 'href' | 'modifiedDate', string> => {
  return {
    href: '/tags/[id]',
    as: `/tags/${item.fileName}`,
    description: item.description,
    modifiedDate: Intl.DateTimeFormat('ja-JP').format(item.modifiedDate),
    title: item.title
  }
}

export const ArticleList: React.FC<ArticleListProps> = ({
  type,
  items
}) => {
  const articleItems = type === 'posts'
    ? (items as ArticlePostItem[]).map(item => getArticlePostItems(item))
    : (items as ArticleTagItem[]).map(item => getArticleTagItems(item))

  const articleCards = articleItems.map(value => (
    <Grid key={value.description} item xs={12} sm={4}>
      <NextLink href={value.href} as={value.as} passHref>
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
      <Typography gutterBottom variant='h4' align='center' component='h1'>{type === 'posts' ? '記事' : 'タグ'}</Typography>
      <Grid container spacing={3} alignItems='center' justify='center'>
        {articleCards}
      </Grid>
    </ArticleListContainer>
  )
}
