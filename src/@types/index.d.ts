import { Theme } from '@material-ui/core'

import type { Workbox } from 'workbox-window'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

declare global {
  interface Window {
    workbox?: Workbox
  }
}
