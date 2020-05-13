import { ServerStyleSheets as MaterialServerStyleSheet } from '@material-ui/core/styles'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'
import { ServerStyleSheet as StyledServerStyleSheet } from 'styled-components'

export default class extends Document {
  static async getInitialProps (ctx: DocumentContext): Promise<DocumentInitialProps> {
    const styledSheet = new StyledServerStyleSheet()
    const materialSheet = new MaterialServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => styledSheet.collectStyles(
            materialSheet.collect(<App {...props} />)
          )
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {styledSheet.getStyleElement()}
            {materialSheet.getStyleElement()}
          </React.Fragment>
        )
      }
    } finally {
      styledSheet.seal()
    }
  }

  public render (): JSX.Element {
    return (
      <Html lang='ja'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
