import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'

import { Article, ArticleFooter, ArticleHeader, ArticleMain } from '../../components'
import { getAllTags, Tag } from '../../lib'
import { internalLinkClickHandler } from '../../lib/router'

interface TagProps {
  tag: SerializeTag
}

interface SerializeTag extends Omit<Tag, 'matterFile' | 'createdDate' | 'modifiedDate'> {
  createdDate: number
  modifiedDate: number
}

const TagPage: React.FC<TagProps> = ({
  tag
}) => {
  const router = useRouter()
  const createdDate = React.useMemo(() => new Date(tag.createdDate).toISOString(), [tag.createdDate])
  const modifiedDate = React.useMemo(() => new Date(tag.modifiedDate).toISOString(), [tag.modifiedDate])
  const handleInternalLink = React.useCallback((event: React.MouseEvent<HTMLElement>) => internalLinkClickHandler(event, router), [router])

  return (
    <React.Fragment>
      <Head>
        <link rel='stylesheet' href='/style/a11y-dark.css' />
      </Head>
      <NextSeo
        description={tag.description}
        title={tag.name}
        openGraph={{
          type: 'article',
          article: {
            tags: [tag.name],
            publishedTime: createdDate,
            modifiedTime: modifiedDate
          },
          description: tag.description,
          title: `${tag.name}`,
          images: [
            {
              url: `https://og-generator.now.sh/?title=${encodeURIComponent(tag.name)}`,
              width: 1280,
              height: 680,
              alt: tag.name
            }
          ]
        }}
      />
      <Article>
        <ArticleHeader
          modifiedTime={tag.modifiedDate}
          title={tag.name}
        />
        <ArticleMain onClick={handleInternalLink} dangerouslySetInnerHTML={{ __html: tag.html }} />
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

  if (!tag) throw new Error('Tag is not found.')

  return {
    props: {
      tag: {
        createdDate: tag.createdDate.valueOf(),
        modifiedDate: tag.modifiedDate.valueOf(),
        description: tag.description,
        fileName: tag.fileName,
        filePath: tag.filePath,
        html: tag.html,
        name: tag.name
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
