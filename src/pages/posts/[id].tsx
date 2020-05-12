import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'

import { BlogBody, HomeBackground, Text } from '../../components'
import { getAllPosts, getPost, Post } from '../../lib'

interface Props {
  id: string
  parsed: Post
}

const PostPage: React.FC<Readonly<Props>> = (props) => {
  const router = useRouter()
  const postTitle = props.parsed.data?.title

  if (!router.isFallback && !props.id) return (<ErrorPage statusCode={404} />)
  if (typeof postTitle !== 'string') return (<ErrorPage statusCode={404} />)

  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/a11y-light.min.css" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js" />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css' />
      </Head>
      <HomeBackground>
        <Text as='p' type='headline-4' color='white'>{postTitle} - InkoHX blog</Text>
      </HomeBackground>
      <BlogBody className='markdown-body'>
        <article>
          <head>
            <title>{postTitle}</title>
          </head>
          <div dangerouslySetInnerHTML={{ __html: props.parsed.content }} />
        </article>
      </BlogBody>
    </React.Fragment>
  )
}

export default PostPage

export const getStaticProps: GetStaticProps<Props> = async context => {
  if (typeof context.params?.id !== 'string') throw new Error('Post ID is not set')

  return {
    props: {
      id: context.params?.id,
      parsed: await getPost(context.params?.id)
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()

  return {
    paths: posts.map(post => {
      const id = post.data.id

      if (typeof id !== 'string') throw new Error('Post ID is not set')

      return {
        params: {
          id
        }
      }
    }),
    fallback: false
  }
}
