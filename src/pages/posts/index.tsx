import { CardActionArea, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import styled from 'styled-components'

import { ArticleListContainer, StyledArticleListCard } from '../../components'
import { chunkArray, getAllPosts, Post } from '../../lib'

import type { GetStaticProps, NextPage } from 'next'
type Posts = Pick<Post, 'hash' | 'title' | 'description'> & Record<'modifiedDate', number>

interface PostsPageProps {
  posts: readonly Posts[][]
}

const PaginationInner = styled(Pagination)`
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

const TagsPage: NextPage<PostsPageProps> = ({
  posts
}) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(parseInteger(router.query.page))

  React.useEffect(() => setCurrentPage(parseInteger(router.query.page)), [router.query.page])

  const postCards = posts[currentPage - 1].map(post => (
    <Grid key={post.description} item xs={12} sm={4}>
      <NextLink href='/posts/[id]' as={`/posts/${post.hash}`} passHref>
        <CardActionArea>
          <StyledArticleListCard>
            <CardHeader subheader={Intl.DateTimeFormat('ja-JP').format(post.modifiedDate)} />
            <CardContent>
              <Typography gutterBottom variant='h6' component='h2'>{post.title}</Typography>
              <Typography variant='body1' component='p'>{post.description}</Typography>
            </CardContent>
          </StyledArticleListCard>
        </CardActionArea>
      </NextLink>
    </Grid>
  ))

  return (
    <React.Fragment>
      <NextSeo
        title='記事一覧'
        description='InkoHXのブログに存在する記事一覧'
        canonical='https://inkohx.me/posts'
        openGraph={{
          type: 'website',
          title: '記事一覧',
          description: 'InkoHXのブログに存在する記事一覧',
          images: [
            {
              url: `https://og-generator.now.sh/?title=${encodeURIComponent('記事一覧')}`,
              width: 1280,
              height: 680,
              alt: '記事一覧'
            }
          ]
        }}
      />
      <ArticleListContainer>
        <Typography gutterBottom component='h1' variant='h4' align='center'>記事一覧</Typography>
        <Grid container spacing={3} alignItems='center' justify='center'>
          {postCards}
        </Grid>
      </ArticleListContainer>
      <PaginationInner
        count={posts.length}
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

export const getStaticProps: GetStaticProps<Readonly<PostsPageProps>> = async () => {
  const posts = await getAllPosts()
    .then(posts => posts.map<Posts>(post => {
      return {
        description: post.description,
        hash: post.hash,
        modifiedDate: post.modifiedDate.valueOf(),
        title: post.title
      }
    }))
    .then(posts => chunkArray(posts, 9))

  return {
    props: {
      posts
    }
  }
}

export default TagsPage
