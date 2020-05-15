import styled from 'styled-components'

export const ArticleMain = styled.main`
  a {
    color: ${props => props.theme.palette.info.main}
  }

  code {
    font-family: SFMono-Regular, Consolas, Liberation Mono,Menlo, monospace;
    font-size: 1em;
  }
`
