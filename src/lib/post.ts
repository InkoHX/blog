import { glob, parseMarkdownFile, MarkdownFile } from './util'

export interface FilteredPostYaml {
  tags: unknown[]
  description: string
  title: string
}

export interface Post extends MarkdownFile, Omit<FilteredPostYaml, 'tags'> {
  tags: string[]
}

export const getAllPosts = async (): Promise<Post[]> => {
  const files = await glob('content/posts/**/*.md')
    .then(paths => Promise.all(paths.map(path => parseMarkdownFile(path))))

  return files
    .filter(file => {
      const data = file.matterFile.data

      if (!Array.isArray(data.tags)) return false
      if (typeof data.title !== 'string') return false
      if (typeof data.description !== 'string') return false

      return true
    })
    .map(value => {
      const data = value.matterFile.data as FilteredPostYaml
      const tags = data.tags
        .filter(value => typeof value === 'string') as string[]

      return {
        createdDate: value.createdDate,
        modifiedDate: value.modifiedDate,
        html: value.html,
        description: data.description,
        title: data.title,
        matterFile: value.matterFile,
        fileName: value.fileName,
        tags
      }
    })
}
