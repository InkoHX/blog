import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import * as React from 'react'

import { ArticleList, ArticlePostItem, ArticleTagItem } from '../components'
import { getAllPosts, getAllTags } from '../lib'

interface IndexPageProps {
  tags: ArticleTagItem[]
  posts: ArticlePostItem[]
}

const IndexPage: NextPage<IndexPageProps> = ({
  posts,
  tags
}) => {
  return (
    <React.Fragment>
      <NextSeo
        title='ホーム'
        description='InkoHXのブログです。適当になんか技術的なこと中心に書いてます。'
        canonical='https://inkohx.dev'
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
      <ArticleList type='posts' items={posts} />
      <ArticleList type='tags' items={tags} />
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const tags = await getAllTags()
    .then(tags => tags.slice(0, 9))
    .then(tags => tags.map<ArticleTagItem>(tag => {
      return {
        fileName: tag.fileName,
        description: tag.description,
        title: tag.name,
        modifiedDate: tag.modifiedDate.valueOf()
      }
    }))
  const posts = await getAllPosts()
    .then(posts => posts.slice(0, 9))
    .then(posts => posts.map<ArticlePostItem>(post => {
      return {
        hash: post.hash,
        description: post.description,
        title: post.title,
        modifiedDate: post.modifiedDate.valueOf()
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
