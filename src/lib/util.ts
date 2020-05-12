import globCallback from 'glob'
import remarkHighlight from 'remark-highlight.js'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import unified from 'unified'
import util from 'util'
import { VFile } from 'vfile'

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
