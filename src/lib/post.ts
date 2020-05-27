import { glob, parseMarkdownFile, MarkdownFile } from './util'
import { createHash } from 'crypto'

export interface PostMetadata {
  tags: unknown[]
  description: string
  title: string
}

export interface Post extends Omit<MarkdownFile, 'matterFile'>, Omit<PostMetadata, 'tags'> {
  tags: string[]
  hash: string
}

export const getAllPostPaths = (): Promise<string[]> => glob('content/posts/**/*.md')

export const hasPostMetadata = (data: { [key: string]: string }): boolean => Array.isArray(data.tags) &&
  typeof data.title === 'string' &&
  typeof data.description === 'string'

export const getPost = async (path: string): Promise<Post | null> => {
  const file = await parseMarkdownFile(path)

  if (!hasPostMetadata(file.matterFile.data)) return null
  const metadata = file.matterFile.data as PostMetadata
  const tags = metadata.tags
    .filter(value => typeof value === 'string') as string[]

  return {
    createdDate: file.createdDate,
    modifiedDate: file.modifiedDate,
    description: metadata.description,
    fileName: file.fileName,
    filePath: file.filePath,
    html: file.html,
    title: metadata.title,
    hash: createHash('md5').update(metadata.title, 'utf8').digest('hex'),
    tags
  }
}

export const getAllPosts = async (): Promise<Post[]> => {
  const files = await getAllPostPaths()
    .then(paths => Promise.all(paths.map(path => parseMarkdownFile(path))))

  return files
    .filter(file => hasPostMetadata(file.matterFile.data))
    .map(value => {
      const metadata = value.matterFile.data as PostMetadata
      const tags = metadata.tags
        .filter(value => typeof value === 'string') as string[]

      return {
        createdDate: value.createdDate,
        modifiedDate: value.modifiedDate,
        html: value.html,
        description: metadata.description,
        title: metadata.title,
        matterFile: value.matterFile,
        fileName: value.fileName,
        filePath: value.filePath,
        hash: createHash('md5').update(metadata.title, 'utf8').digest('hex'),
        tags
      }
    })
}
