import styled from 'styled-components'

export type TextType = 'headline-1' |
'headline-2' |
'headline-3' |
'headline-4' |
'headline-5' |
'headline-6' |
'subTitle-1' |
'subTitle-2' |
'body-1' |
'body-2' |
'button' |
'caption' |
'overline'

export type TextColor = 'black' | 'white'

export interface TextProps {
  readonly type?: TextType
  readonly color?: TextColor
}

export type TextWeight = 300 | 400 | 500

export interface TypeScale {
  weight: TextWeight
  size: number
  letterSpacing: number
}

const defaultTypeScale: Record<TextType, TypeScale> = {
  'headline-1': {
    size: 104,
    letterSpacing: -1.5,
    weight: 300
  },
  'headline-2': {
    size: 65,
    letterSpacing: -0.5,
    weight: 300
  },
  'headline-3': {
    size: 52,
    letterSpacing: 0,
    weight: 400
  },
  'headline-4': {
    size: 37,
    letterSpacing: 0.25,
    weight: 400
  },
  'headline-5': {
    size: 26,
    letterSpacing: 0,
    weight: 400
  },
  'headline-6': {
    size: 22,
    letterSpacing: 0.15,
    weight: 500
  },
  'subTitle-1': {
    size: 17,
    letterSpacing: 0.15,
    weight: 400
  },
  'subTitle-2': {
    size: 15,
    letterSpacing: 0.1,
    weight: 500
  },
  'body-1': {
    size: 17,
    letterSpacing: 0.5,
    weight: 400
  },
  'body-2': {
    size: 15,
    letterSpacing: 0.25,
    weight: 400
  },
  button: {
    size: 15,
    letterSpacing: 1.25,
    weight: 500
  },
  caption: {
    size: 13,
    letterSpacing: 0.4,
    weight: 400
  },
  overline: {
    size: 11,
    letterSpacing: 1.5,
    weight: 400
  }
}

export const Text = styled.p<TextProps>(props => {
  const scale = defaultTypeScale[props.type ?? 'headline-1']

  return `
    font-size: ${scale.size}px;
    font-weight: ${scale.weight};
    letter-spacing: ${scale.letterSpacing}px;
    color: ${props.color ?? 'black'};
    word-break: break-all;
  `
})
