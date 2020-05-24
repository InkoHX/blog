import { Typography } from '@material-ui/core'
import { NextPage } from 'next'
import * as React from 'react'
import styled from 'styled-components'

const AboutContainer = styled.div`
  margin: 50px auto;
`

const TextContainer = styled.div`
  margin: 15px auto;
`

const AboutBlog: React.FC = () => (
  <TextContainer>
    <Typography gutterBottom component='h2' variant='h5'>このブログについて</Typography>
      <Typography
        
        variant='body1'
        
      >
        InkoHX Blog は Next.js を使用して作られた自作のブログです。InkoHXが手にしているノウハウをここに共有する感じで書いていきたいと思います。
        それとWebに弱いのでまだまだ設計が安定していませんが、これからも頑張って開発していきます！
        それと、このブログはオープンソースで開発されており、誰でも自由に使用でき、貢献することができます。不具合や良い提案があれば遠慮せずGitHubでissuesやPRを立ててください！
        リポジトリはこのブログの一番下にあるフッターにあるリンクから飛ぶことが可能です。
      </Typography>
  </TextContainer>
)

const Issues: React.FC = () => (
  <TextContainer>
    <Typography gutterBottom component='h2' variant='h5'>誤字や間違った情報について</Typography>
    <Typography
      component='p'
      variant='body1'
    >
      私も誤字や間違った情報を書かないように最大の注意を払いますが、どうしても見落としが出てしまうかもしれません...
      もし皆さんが誤字や間違った情報を見つけた場合は、GitHubで問題の部分を書きissuesやPRを立てるようご協力お願いします。
      対象の記事の場所が分かるように記事、タグページの一番下の方にそのページのファイルへ飛べるようにGitHubへのリンクを配置してありますので簡単にPRを送れると思います。
    </Typography>
  </TextContainer>
)

const PWA: React.FC = () => (
  <TextContainer>
    <Typography gutterBottom component='h2' variant='h5'>PWA対応</Typography>
    <Typography
    component='p'
    variant='body1'
    >
      このサイトは PWA (Progressive Web Application) に対応しており、スマホやデスクトップにこのサイトをホームに配置してアプリのように扱うことが可能です。
      素早くこのサイトを見ることもできるので、気になったら是非試してみてください。
    </Typography>
  </TextContainer>
)

const AboutPage: NextPage = () => {
  return (
    <AboutContainer>
      <Typography gutterBottom component='h1' variant='h4' align='center'>InkoHX Blog</Typography>
      <AboutBlog />
      <Issues />
      <PWA />
    </AboutContainer>
  )
}

export default AboutPage
