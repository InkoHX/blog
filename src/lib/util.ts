import { promises as fs } from 'fs'
import globCallback from 'glob'
import matter, { GrayMatterFile } from 'gray-matter'
import markdownIt from 'markdown-it'
import { basename } from 'path'
import util from 'util'

const globAsync = util.promisify(globCallback)

/**
 * @param content Markdown content of string
 */
export const stringifyHTML = (content: string): string => markdownIt()
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  .use(require('markdown-it-highlightjs'))
  .render(content)

export const glob = (pattern: string): Promise<string[]> => globAsync(pattern, { cwd: process.cwd() })

export const chunkArray = <T extends any[]>(array: T, size: number): T[] => array
  .reduce(
    (previousValue, _currentValue, currentIndex) => currentIndex % size
      ? previousValue
      : [
        ...previousValue,
        array.slice(currentIndex, currentIndex + size)
      ], []
  )

export const parseMarkdownFile = async (path: string): Promise<MarkdownFile> => {
  const data = matter(await fs.readFile(path, 'utf8'))
  const html = stringifyHTML(data.content)

  const modifiedDate = data.data?.modifiedDate
  const createdDate = data.data?.createdDate

  if (!modifiedDate) throw new Error('The modifiedDate is missing in the YAML header.')
  if (!createdDate) throw new Error('The createdDate is missing in the YAML header.')

  return {
    html,
    createdDate,
    modifiedDate,
    matterFile: data,
    fileName: basename(path, '.md'),
    filePath: path
  }
}

export interface MarkdownFile {
  matterFile: GrayMatterFile<string>
  createdDate: Date
  modifiedDate: Date
  html: string
  fileName: string
  filePath: string
}
