import styled from 'styled-components'
import * as React from 'react'
import { Typography } from '@material-ui/core'

const ArticleFooterInner = styled.footer`
  margin-top: 50px;
`

export interface ArticleFooterProps {
  filePath: string
}

export const ArticleFooter: React.FC<ArticleFooterProps> = ({ filePath }) => {
  const editLink = `https://github.com/InkoHX/blog/edit/master/${filePath}`

  return (
    <ArticleFooterInner>
      <Typography component='a' href={editLink}>このページをGitHubで編集する。</Typography>
    </ArticleFooterInner>
  )
}
