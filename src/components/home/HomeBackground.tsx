import styled, { keyframes } from 'styled-components'

const keyframe = keyframes`
  from: { background-position: 0% 100%; }
  50% { background-position: 100% 0%; }
  to: { background-position: 0% 100%; }
`

export const HomeBackground = styled.div`
  background: linear-gradient(45deg, #7c43bd, #4a148c, #38006b);
  background-size: 500% 500%;
  animation: ${keyframe} 10s ease infinite;
  padding: 200px 30px;
`
