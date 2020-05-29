import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const Article = styled(Paper)`
  padding: 50px 50px;
  margin: 50px 100px;
  margin-bottom: 50px;
  background-color: ${props => props.theme.palette.background.paper};

  @media screen and (max-width: 900px) {
    margin: 15px 0;
    padding: 10px 5px;
  }

  a,
  a:visited {
    color: #90caf9;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`.withComponent('article')
