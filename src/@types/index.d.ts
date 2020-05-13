import { Theme } from '@material-ui/core'

declare module 'remark-html' {
  export default function (): any
}

declare module 'remark-highlight.js' {
  export default function (): any
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
