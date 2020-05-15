import { glob, parseMarkdownFile, MarkdownFile } from './util'

export interface TagMetadata {
  name: string
  description: string
}

export interface Tag extends MarkdownFile, TagMetadata {}

export const getAllTagPaths = (): Promise<string[]> => glob('content/tags/**/*.md')

export const hasTagMetadata = (data: { [key: string]: string }): boolean =>
  typeof data.name === 'string' &&
  typeof data.description === 'string'

export const getTag = async (path: string): Promise<Tag | null> => {
  const file = await parseMarkdownFile(path)

  if (!hasTagMetadata(file.matterFile.data)) return null
  const metadata = file.matterFile.data as TagMetadata

  return {
    createdDate: file.createdDate,
    modifiedDate: file.modifiedDate,
    description: metadata.description,
    matterFile: file.matterFile,
    fileName: file.fileName,
    filePath: file.filePath,
    html: file.html,
    name: metadata.name
  }
}

export const getAllTags = async (): Promise<Tag[]> => {
  const files = await getAllTagPaths()
    .then(paths => Promise.all(paths.map(path => parseMarkdownFile(path))))
    .then(files => files.filter(file => hasTagMetadata(file.matterFile.data)))

  return files
    .map(value => {
      const data = value.matterFile.data as TagMetadata

      return {
        createdDate: value.createdDate,
        modifiedDate: value.modifiedDate,
        html: value.html,
        description: data.description,
        name: data.name,
        matterFile: value.matterFile,
        fileName: value.fileName,
        filePath: value.filePath
      }
    })
}
