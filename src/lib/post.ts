import { promises as fs } from 'fs'
import matter from 'gray-matter'

import { glob, parseMarkdownToHTML } from './util'

export interface Post {
  data: { [key: string]: unknown }
  content: string
}

export async function getPost (name: string): Promise<Post> {
  const file = await glob(`content/posts/**/${name}.md`)
    .then(paths => paths.shift())

  if (!file) throw new Error('content not found.')

  return fs.readFile(file, 'utf8')
    .then(value => matter(value))
    .then(async value => {
      const content = await parseMarkdownToHTML(value.content)

      return {
        data: value.data,
        content: content.toString('utf8')
      } as Post
    })
}

export function getAllPosts (): Promise<Post[]> {
  return glob('content/posts/**/*.md')
    .then(paths => Promise.all(paths.map(path => fs.readFile(path, 'utf8'))))
    .then(values => Promise.all(values.map(value => matter(value))))
    .then(files => Promise.all(files.map(async file => {
      const content = await parseMarkdownToHTML(file.content)

      return {
        data: file.data,
        content: content.toString('utf8')
      } as Post
    })))
}
