import { Grid, Paper, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import * as React from 'react'
import styled from 'styled-components'
import { UrlObject } from 'url'

interface FooterGridItemInternal {
  type: 'internal'
  name: string
  href: string
  as?: string | UrlObject
}

interface FooterGridItemExternal {
  type: 'external'
  name: string
  href: string
}

type FooterGirdItem = FooterGridItemExternal | FooterGridItemInternal

interface FooterGridListProps {
  title: string
  items: Array<Readonly<FooterGirdItem>>
}

const FooterInner = styled(Paper)`
  width: 100%;
  padding: 50px 30px;
  background-color: ${props => props.theme.palette.background.paper};
`

const GridInner = styled(Grid)`
  padding: 30px 150px;

  @media screen and (max-width: 900px) {
    padding: 15px 0;
  }
`

const Ul = styled.ul`
  list-style: none;
  margin: 10px 0;
  padding: 0;
`

const Li = styled.li`
  padding: 5px 0;
`

export const FooterGridList: React.FC<Readonly<FooterGridListProps>> = ({
  items,
  title
}) => {
  const gridItems = items.map(item => (
    <Li key={item.name}>
      {
        item.type === 'internal' ? (
          <NextLink href={item.href} as={item.as} passHref>
            <Typography variant='body2' component='a' color='inherit'>{item.name}</Typography>
          </NextLink>
        ) : (
          <Typography href={item.href} variant='body2' component='a' color='inherit'>{item.name}</Typography>
        )
      }
    </Li>
  ))

  return (
    <Grid item>
      <Typography variant='subtitle1' component='p'>{title}</Typography>
      <Ul>
        {gridItems}
      </Ul>
    </Grid>
  )
}

export const Footer: React.FC = () => {
  const blog: FooterGridListProps = {
    title: 'Blog',
    items: [
      {
        type: 'internal',
        name: '記事一覧',
        href: '/posts'
      },
      {
        type: 'internal',
        name: 'タグ一覧',
        href: '/tags'
      },
      {
        type: 'external',
        name: 'ライセンス',
        href: 'https://github.com/InkoHX/blog/blob/master/LICENSE'
      },
      {
        type: 'external',
        name: 'リポジトリ',
        href: 'https://github.com/InkoHX/blog'
      }
    ]
  }

  const social: FooterGridListProps = {
    title: 'Social',
    items: [
      {
        type: 'external',
        name: 'Twitter',
        href: 'https://twitter.com/InkoHX'
      },
      {
        type: 'external',
        name: 'Qiita',
        href: 'https://qiita.com/InkoHX'
      },
      {
        type: 'external',
        name: 'GitHub',
        href: 'https://github.com/InkoHX'
      },
      {
        type: 'external',
        name: 'Scrapbox',
        href: 'https://scrapbox.io/InkoHX'
      }
    ]
  }

  return (
    <FooterInner as='footer'>
      <GridInner justify='flex-end' container spacing={3}>
        <FooterGridList {...blog} />
        <FooterGridList {...social} />
      </GridInner>
      <Typography
        variant='body1'
        component='p'
      >
        プログラム、コンテンツは<Typography color='inherit' component='a' href='https://github.com/InkoHX/blog/blob/master/LICENSE'>MITライセンス</Typography>に基づいてオープンソースプロジェクトとして公開されています。
      </Typography>
    </FooterInner>
  )
}
