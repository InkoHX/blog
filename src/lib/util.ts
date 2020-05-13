import { promises as fs } from 'fs'
import globCallback from 'glob'
import matter, { GrayMatterFile } from 'gray-matter'
import { basename } from 'path'
import remarkParse from 'remark-parse'
import unified from 'unified'
import util from 'util'
import { VFile } from 'vfile'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const remarkHighlight = require('remark-highlight.js')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remarkHtml = require('remark-html')

const globAsync = util.promisify(globCallback)

/**
 * @param content Markdown content of string
 */
export const stringifyHTML = (content: string): Promise<VFile> => unified()
  .use(remarkParse)
  .use(remarkHighlight)
  .use(remarkHtml)
  .process(content)

export const glob = (pattern: string): Promise<string[]> => globAsync(pattern, { cwd: process.cwd() })

export const parseMarkdownFile = async (path: string): Promise<MarkdownFile> => {
  const data = matter(await fs.readFile(path, 'utf8'))
  const html = (await stringifyHTML(data.content)).toString('utf8')
  const { ctime, mtime } = await fs.stat(path)

  return {
    html,
    createdDate: ctime,
    modifiedDate: mtime,
    matterFile: data,
    fileName: basename(path, '.md')
  }
}

export interface MarkdownFile {
  matterFile: GrayMatterFile<string>
  createdDate: Date
  modifiedDate: Date
  html: string
  fileName: string
}
