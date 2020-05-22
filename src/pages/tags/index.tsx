import { OpenInNew } from '@material-ui/icons'
import MaterialTable from 'material-table'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import * as React from 'react'
import styled from 'styled-components'

import { getAllTags, Tag } from '../../lib'
import { tableIcons, tableLocales } from '../../lib/material-table'

type PickedTags = Pick<Tag, 'fileName' | 'name' | 'description'>

interface TagsPageProps {
  tags: readonly PickedTags[]
}

const Table = styled.div`
  padding: 80px 50px;

  @media screen and (max-width: 900px) {
    padding: 80px 10px;
  }
`

const PostsPage: React.FC<TagsPageProps> = ({
  tags
}) => {
  const router = useRouter()

  return (
    <React.Fragment>
      <NextSeo
        title='タグ一覧'
        description='InkoHXのブログに存在するタグの一覧'
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
      <Table>
        <MaterialTable
          columns={[
            { title: '名前', field: 'name' },
            { title: '説明', field: 'description' }
          ]}
          data={tags.map(tag => {
            return {
              name: tag.name,
              description: tag.description,
              fileName: tag.fileName
            }
          })}
          actions={[
            {
              tooltip: '見る',
              // eslint-disable-next-line react/display-name
              icon: () => <OpenInNew />,
              onClick: (_event, data) => router.push('/tags/[id]', `/tags/${Array.isArray(data) ? data.shift()?.fileName ?? '' : data.fileName}`)
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

export const getStaticProps: GetStaticProps<Readonly<TagsPageProps>> = async () => {
  const tags = await getAllTags()
    .then(tags => tags.map<PickedTags>(tag => {
      return {
        description: tag.description,
        fileName: tag.fileName,
        name: tag.name
      }
    }))

  return {
    props: {
      tags
    }
  }
}

export default PostsPage
