import globCallback from 'glob'
import remarkParse from 'remark-parse'
import unified from 'unified'
import util from 'util'
import { VFile } from 'vfile'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const remarkHighlight = require('remark-highlight.js')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remarkHtml = require('remark-html')
const globAsync = util.promisify(globCallback)

export function parseMarkdownToHTML (content: string): Promise<VFile> {
  return unified()
    .use(remarkParse)
    .use(remarkHighlight)
    .use(remarkHtml)
    .process(content)
}

export function glob (pattern: string): Promise<string[]> {
  return globAsync(pattern, { cwd: process.cwd() })
}
