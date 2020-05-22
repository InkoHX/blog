import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import * as React from 'react'
import styled from 'styled-components'

import { ArticleItem, ArticleList } from '../components'
import { getAllPosts, getAllTags } from '../lib'

interface IndexPageProps {
  tags: ArticleItem[]
  posts: ArticleItem[]
}

const ArticleElement = styled.div`
  margin: auto 50px;

  @media screen and (max-width: 900px) {
    margin: auto 5px;
  }
`

const IndexPage: React.FC<IndexPageProps> = ({
  posts,
  tags
}) => {
  return (
    <React.Fragment>
      <NextSeo
        title='ホーム'
        description='InkoHXのブログです。適当になんか技術的なこと中心に書いてます。'
        openGraph={{
          description: '技術的なことについてInkoHXが色々書いているサイト',
          title: 'ホーム',
          images: [
            {
              url: `https://og-generator.now.sh/?title=${encodeURIComponent('InkoHX Blog')}`,
              width: 1280,
              height: 680,
              alt: 'InkoHX Blog'
            }
          ]
        }}
      />
      <ArticleElement>
        <ArticleList type='post' items={posts} />
        <ArticleList type='tag' items={tags} />
      </ArticleElement>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const tags = await getAllTags()
    .then(tags => tags.slice(0, 9))
    .then(tags => tags.map<ArticleItem>(tag => {
      return {
        fileName: tag.fileName,
        description: tag.description,
        title: tag.name
      }
    }))
  const posts = await getAllPosts()
    .then(posts => posts.slice(0, 9))
    .then(posts => posts.map<ArticleItem>(post => {
      return {
        fileName: post.fileName,
        description: post.description,
        title: post.title
      }
    }))

  return {
    props: {
      posts,
      tags
    }
  }
}

export default IndexPage
