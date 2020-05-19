import { Typography } from '@material-ui/core'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import * as React from 'react'
import styled from 'styled-components'

import { ArticleItem, ArticleList, HomeBackground } from '../components'
import { getAllPosts, getAllTags } from '../lib'

interface IndexPageProps {
  tags: ArticleItem[]
  posts: ArticleItem[]
}

const TypingText: React.FC = () => {
  const text = React.useMemo(() => [
    'JavaScript programmer.',
    'TypeScript programmer.',
    'Node.js programmer.',
    'Vue.js programmer.',
    'React.js programmer.',
    'php programmer.',
    'member of Discord.js Japan User Group.'
  ], [])

  const [currentText, setCurrentText] = React.useState('')
  const [isFinish, setFinish] = React.useState(false)
  const [isWriting, setWriting] = React.useState(false)

  const waitTimeout = (handler: (...args: unknown[]) => void, timeout: number): Promise<void> => {
    return new Promise(resolve => setTimeout(() => resolve(handler()), timeout))
  }
  const getRandomText = React.useCallback(() => text[Math.floor(Math.random() * text.length)], [text])
  const startTyping = React.useCallback(async () => {
    if (!isFinish) {
      setWriting(true)
      const inputText = [...getRandomText()]
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      await Promise.all(inputText.map((text, index) => waitTimeout(() => setCurrentText(current => current + text), 75 * index + 1)))

      setFinish(true)
    }
  }, [isFinish, getRandomText])

  React.useEffect(() => {
    if (isFinish) {
      setTimeout(() => {
        setCurrentText('')
        setFinish(false)
        setWriting(false)
      }, 1000)
    }

    if (!isFinish && !isWriting) {
      setTimeout(() => startTyping(), 500)
    }
  }, [isFinish, isWriting, startTyping])

  return (
    <Typography style={{ position: 'absolute' }} component='h1' variant='h4'>InkoHX is { currentText}</Typography>
  )
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
          title: 'ホーム'
        }}
      />
      <HomeBackground>
        <TypingText />
      </HomeBackground>
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
