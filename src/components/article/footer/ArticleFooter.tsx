import { Typography } from '@material-ui/core'
import * as React from 'react'

import { ArticleFooterProps, ArticleFooterRoot } from '.'

export const ArticleFooter: React.FC<ArticleFooterProps> = ({ filePath }) => {
  const editLink = `https://github.com/InkoHX/blog/edit/master/${filePath}`

  return (
    <ArticleFooterRoot>
      <Typography component='a' href={editLink}>このページをGitHubで編集する。</Typography>
    </ArticleFooterRoot>
  )
}
