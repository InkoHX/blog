import { Chip, Typography, Divider } from '@material-ui/core'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import * as React from 'react'

const ChipInner = styled(Chip)`
  margin: 3px 3px;
`

const Headline = styled.div`
  margin: 15px 0;
`

export interface ArticleHeaderProps {
  tags?: string[]
  title: string
  modifiedTime: number
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  modifiedTime,
  title,
  tags
}) => {
  const router = useRouter()
  const modifiedDateTime = React.useMemo(() => Intl.DateTimeFormat('ja-JP').format(new Date(modifiedTime)), [modifiedTime])
  const chips = tags?.map(tag => (
    <ChipInner key={tag} label={tag} onClick={() => router.push('/tags/[id]', `/tags/${tag}`)} />
  ))

  return (
    <header>
      <Headline>
        <Typography variant='h3' component='h1' style={{ marginBottom: '10px' }}>{title}</Typography>
        <Typography variant='subtitle2' component='p'>最終更新日: {modifiedDateTime}</Typography>
        {chips}
      </Headline>
      <Divider style={{ margin: '10px 0' }} />
    </header>
  )
}
