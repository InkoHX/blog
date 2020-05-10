import styled, { keyframes } from 'styled-components'

const keyframe = keyframes`
  from: { background-position: 0% 100%; }
  50% { background-position: 100% 0%; }
  to: { background-position: 0% 100%; }
`

const gradientColors = [
  '#790e8b',
  '#6a0080',
  '#5c007a',
  '#4a0072',
  '#38006b'
]

export const HomeBackground = styled.div`
  background: linear-gradient(45deg, ${gradientColors.join()});
  background-size: 500% 500%;
  animation: ${keyframe} 10s ease infinite;
  padding: 200px 30px;
`
