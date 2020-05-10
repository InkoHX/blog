import styled from 'styled-components'

export interface CardProps {
  readonly width?: string
  readonly height?: string
}

export const Card = styled.div<CardProps>(props => `
  ${props.width ? `width: ${props.width}px;` : ''}
  ${props.height ? `height: ${props.height}px;` : ''}
  max-width: 100%;
  background-color: #f0f0f0;
  margin: 15px 15px;
`)
