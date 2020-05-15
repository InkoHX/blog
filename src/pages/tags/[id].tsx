import { Typography } from '@material-ui/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as React from 'react'

import { Article, ArticleMain, HomeBackground, ArticleHeader, ArticleFooter } from '../../components'
import { getAllTags, Tag, TagMetadata } from '../../lib'
import Head from 'next/head'

interface TagProps {
  tag: SerializeTag
}

interface SerializeTag extends Omit<Tag, 'matterFile' | 'createdDate' | 'modifiedDate'> {
  createdDate: number
  modifiedDate: number
  yaml: TagMetadata
}

const TagPage: React.FC<TagProps> = ({
  tag
}) => {
  return (
    <React.Fragment>
      <Head>
        <link rel='stylesheet' href='/style/a11y-dark.css' />
      </Head>
      <HomeBackground>
        <Typography variant='h5' component='p'>{tag.name} - InkoHX blog</Typography>
      </HomeBackground>
      <Article>
        <ArticleHeader
          modifiedTime={tag.modifiedDate}
          title={tag.name}
        />
        <ArticleMain dangerouslySetInnerHTML={{ __html: tag.html }} />
        <ArticleFooter filePath={tag.filePath} />
      </Article>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<TagProps> = async context => {
  const id = context.params?.id

  if (typeof id !== 'string') throw new Error('Tag ID is not string.')

  const tag = await getAllTags()
    .then(tags => tags.find(tag => tag.fileName === id))

  if (!tag) throw new Error('')

  return {
    props: {
      tag: {
        createdDate: tag.createdDate.valueOf(),
        modifiedDate: tag.modifiedDate.valueOf(),
        description: tag.description,
        fileName: tag.fileName,
        filePath: tag.filePath,
        html: tag.html,
        name: tag.name,
        yaml: tag.matterFile.data as TagMetadata
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags()
  const paths = tags
    .map(tag => {
      return {
        params: {
          id: tag.fileName
        }
      }
    })

  return {
    paths,
    fallback: false
  }
}

export default TagPage
