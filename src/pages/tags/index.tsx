import { CardActionArea, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import styled from 'styled-components'

import { ArticleListContainer, StyledArticleListCard } from '../../components'
import { chunkArray, getAllTags, Tag } from '../../lib'

import type { GetStaticProps, NextPage } from 'next'
type Tags = Pick<Tag, 'fileName' | 'name' | 'description'> & Record<'modifiedDate', number>

interface TagsPageProps {
  tags: readonly Tags[][]
}

const StyledPagination = styled(Pagination)`
  ul {
    margin: 30px auto;
    justify-content: center;
  }
`

const parseInteger = (value?: string | string[]): number => value && !Array.isArray(value)
  ? parseInt(value) <= 0
    ? 1
    : parseInt(value)
  : 1

const TagsPage: NextPage<TagsPageProps> = ({
  tags
}) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(parseInteger(router.query.page))

  React.useEffect(() => setCurrentPage(parseInteger(router.query.page)), [router.query.page])

  const tagCards = tags[currentPage - 1].map(tag => (
    <Grid key={tag.description} item xs={12} sm={4}>
      <NextLink href='/tags/[id]' as={`/tags/${tag.fileName}`} passHref>
        <CardActionArea>
          <StyledArticleListCard>
            <CardHeader subheader={Intl.DateTimeFormat('ja-JP').format(tag.modifiedDate)} />
            <CardContent>
              <Typography gutterBottom variant='h6' component='h2'>{tag.name}</Typography>
              <Typography variant='body1' component='p'>{tag.description}</Typography>
            </CardContent>
          </StyledArticleListCard>
        </CardActionArea>
      </NextLink>
    </Grid>
  ))

  return (
    <React.Fragment>
      <NextSeo
        title='タグ一覧'
        description='InkoHXのブログに存在するタグの一覧'
        canonical='https://blog.inkohx.dev/tags'
        openGraph={{
          type: 'website',
          title: 'タグ一覧',
          description: 'InkoHXのブログに存在するタグの一覧',
          images: [
            {
              url: `https://og-generator.now.sh/?title=${encodeURIComponent('タグ一覧')}`,
              width: 1280,
              height: 680,
              alt: 'タグ一覧'
            }
          ]
        }}
      />
      <ArticleListContainer>
        <Typography gutterBottom component='h1' variant='h4' align='center'>タグ一覧</Typography>
        <Grid container spacing={3} alignItems='center' justify='center'>
          {tagCards}
        </Grid>
      </ArticleListContainer>
      <StyledPagination
        count={tags.length}
        page={currentPage}
        showFirstButton
        showLastButton
        renderItem={params => (
          <NextLink href={{ query: { page: params.page } }} shallow passHref>
            <PaginationItem {...params} />
          </NextLink>
        )}
      />
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<Readonly<TagsPageProps>> = async () => {
  const tags = await getAllTags()
    .then(tags => tags.map<Tags>(tag => {
      return {
        description: tag.description,
        fileName: tag.fileName,
        modifiedDate: tag.modifiedDate.valueOf(),
        name: tag.name
      }
    }))
    .then(tags => chunkArray(tags, 9))

  return {
    props: {
      tags
    }
  }
}

export default TagsPage
