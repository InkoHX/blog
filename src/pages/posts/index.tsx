import { OpenInNew } from '@material-ui/icons'
import MaterialTable from 'material-table'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import * as React from 'react'
import styled from 'styled-components'

import { getAllPosts, getAllTags, Post, Tag } from '../../lib'
import { tableIcons, tableLocales } from '../../lib/material-table'

type PickedPost = Pick<Post, 'description' | 'title' | 'hash'>

type PickedTags = Pick<Tag, 'fileName' | 'name' | 'description'>

type Posts = (PickedPost & { tags: readonly PickedTags[] })

interface PostsPageProps {
  posts: readonly Posts[]
}

const Table = styled.div`
  padding: 80px 50px;

  @media screen and (max-width: 900px) {
    padding: 80px 10px;
  }
`

const PostsPage: React.FC<PostsPageProps> = ({
  posts
}) => {
  const router = useRouter()

  return (
    <React.Fragment>
      <NextSeo
        title='記事一覧'
        description='InkoHXがブログに投稿した記事の一覧ページ'
        openGraph={{
          type: 'website',
          title: '記事一覧',
          description: 'InkoHXがブログに投稿した記事の一覧ページ',
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
      <Table>
        <MaterialTable
          columns={[
            { title: 'タイトル', field: 'title' },
            { title: '説明', field: 'description' },
            { title: 'タグ', field: 'tags', sorting: false }
          ]}
          data={posts.map(post => {
            return {
              title: post.title,
              description: post.description,
              hash: post.hash,
              tags: post.tags.map(tag => tag.name).join(' ') || 'なし'
            }
          })}
          actions={[
            {
              tooltip: '見る',
              // eslint-disable-next-line react/display-name
              icon: () => <OpenInNew />,
              onClick: (_event, data) => router.push('/posts/[id]', `/posts/${Array.isArray(data) ? data.shift()?.hash ?? '' : data.hash}`)
            }
          ]}
          options={{
            search: true,
            pageSizeOptions: [],
            pageSize: 10,
            showTitle: false,
            draggable: false,
            actionsColumnIndex: 1
          }}
          icons={tableIcons}
          localization={tableLocales}
        />
      </Table>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<Readonly<PostsPageProps>> = async () => {
  const tags = await getAllTags()
  const posts = await getAllPosts()
    .then(posts => posts.map<Posts>(post => {
      return {
        title: post.title,
        description: post.description,
        hash: post.hash,
        tags: tags
          .filter(tag => post.tags.includes(tag.name))
          .map<PickedTags>(tag => {
          return {
            fileName: tag.fileName,
            name: tag.name,
            description: tag.description
          }
        })
      }
    }))

  return {
    props: {
      posts
    }
  }
}

export default PostsPage
