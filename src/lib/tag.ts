import { promises as fs } from 'fs'
import matter from 'gray-matter'

import { glob, parseMarkdownToHTML } from './util'

export interface Tag {
  data: { [key: string]: unknown }
  content: string
}

export async function getTag (name: string): Promise<Tag> {
  const file = await glob(`content/tags/**/${name}.md`)
    .then(paths => paths.shift())

  if (!file) throw new Error('tag not found.')

  return fs.readFile(file, 'utf8')
    .then(value => matter(value))
    .then(async value => {
      const content = await parseMarkdownToHTML(value.content)

      return {
        data: value.data,
        content: content.toString('utf8')
      } as Tag
    })
}

export function getAllTags (): Promise<Tag[]> {
  return glob('content/tags/**/*.md')
    .then(paths => Promise.all(paths.map(path => fs.readFile(path, 'utf8'))))
    .then(values => Promise.all(values.map(value => matter(value))))
    .then(files => Promise.all(files.map(async file => {
      const content = await parseMarkdownToHTML(file.content)

      return {
        data: file.data,
        content: content.toString('utf8')
      } as Tag
    })))
}
