import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'

import { Article, ArticleFooter, ArticleHeader, ArticleMain } from '../../components'
import { getAllPosts, getAllTags, Post, TagMetadata } from '../../lib'
import { internalLinkClickHandler } from '../../lib/router'

interface PostProps {
  post: SerializePost
}

export interface PostTag extends Omit<TagMetadata, 'description'> {
  fileName: string
}

interface SerializePost extends Omit<Post, 'matterFile' | 'modifiedDate' | 'createdDate' | 'tags' | 'hash'> {
  modifiedDate: number
  createdDate: number
  tags: PostTag[]
}

const PostPage: React.FC<PostProps> = ({
  post
}) => {
  const router = useRouter()
  const createdDate = React.useMemo(() => new Date(post.createdDate).toISOString(), [post.createdDate])
  const modifiedDate = React.useMemo(() => new Date(post.modifiedDate).toISOString(), [post.modifiedDate])
  const handleInternalLink = React.useCallback((event: React.MouseEvent<HTMLElement>) => internalLinkClickHandler(event, router), [router])

  return (
    <React.Fragment>
      <Head>
        <link rel='stylesheet' href='/style/a11y-dark.css' />
      </Head>
      <NextSeo
        description={post.description}
        title={post.title}
        openGraph={{
          type: 'article',
          title: `${post.title}`,
          description: post.description,
          article: {
            modifiedTime: modifiedDate,
            publishedTime: createdDate,
            tags: post.tags.map(tag => tag.name)
          },
          images: [
            {
              url: `https://og-generator.now.sh/?title=${encodeURIComponent(post.title)}`,
              width: 1280,
              height: 680,
              alt: post.title
            }
          ]
        }}
      />
      <Article>
        <ArticleHeader
          modifiedTime={post.modifiedDate}
          title={post.title}
          tags={post.tags}
        />
        <ArticleMain onClick={handleInternalLink} dangerouslySetInnerHTML={{ __html: post.html }} />
        <ArticleFooter filePath={post.filePath} />
      </Article>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const post = await getAllPosts()
    .then(posts => posts.find(post => post.hash === params?.id))

  if (!post) throw new Error('Post is not found.')

  const tags = await getAllTags()
    .then(tags => tags.filter(tag => post.tags.includes(tag.name)))
    .then(tags => tags.map(tag => {
      return {
        name: tag.name,
        fileName: tag.fileName
      } as PostTag
    }))

  return {
    props: {
      post: {
        createdDate: post.createdDate.valueOf(),
        modifiedDate: post.modifiedDate.valueOf(),
        description: post.description,
        fileName: post.fileName,
        filePath: post.filePath,
        html: post.html,
        title: post.title,
        tags
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPosts()
    .then(posts => posts.map(post => {
      return {
        params: {
          id: post.hash
        }
      }
    }))

  return {
    paths,
    fallback: false
  }
}

export default PostPage
