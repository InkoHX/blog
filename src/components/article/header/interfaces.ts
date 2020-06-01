import type { PostTag } from '../../../pages/posts/[id]'

export interface ArticleHeaderProps {
  tags?: PostTag[]
  title: string
  modifiedTime: number
}
