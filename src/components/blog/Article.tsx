import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const Article = styled(Paper)`
  padding: 50px 50px;
  margin: 50px 100px;
  margin-bottom: 50px;
  background-color: ${props => props.theme.palette.background.paper};

  @media screen and (max-width: 900px) {
    margin: 5px;
  }

  a,
  a:visited {
    color: #90caf9;
  }
`.withComponent('article')
