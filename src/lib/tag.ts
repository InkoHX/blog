import { glob, parseMarkdownFile, MarkdownFile } from './util'

export interface FilteredTagYaml {
  name: string
  description: string
}

export interface Tag extends MarkdownFile, FilteredTagYaml {}

export const getAllTags = async (): Promise<Tag[]> => {
  const files = await glob('content/tags/**/*.md')
    .then(paths => Promise.all(paths.map(path => parseMarkdownFile(path))))

  return files
    .filter(file => {
      const data = file.matterFile.data

      if (typeof data.name !== 'string') return false
      if (typeof data.description !== 'string') return false

      return true
    })
    .map(value => {
      const data = value.matterFile.data as FilteredTagYaml

      return {
        createdDate: value.createdDate,
        modifiedDate: value.modifiedDate,
        html: value.html,
        description: data.description,
        name: data.name,
        matterFile: value.matterFile,
        fileName: value.fileName
      }
    })
}
