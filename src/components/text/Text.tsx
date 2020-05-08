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
  size: string
  letterSpacing: string
}

const defaultTypeScale: Record<TextType, TypeScale> = {
  'headline-1': {
    size: '104px',
    letterSpacing: '-1.5px',
    weight: 300
  },
  'headline-2': {
    size: '65px',
    letterSpacing: '-0.5px',
    weight: 300
  },
  'headline-3': {
    size: '52px',
    letterSpacing: '0px',
    weight: 400
  },
  'headline-4': {
    size: '37px',
    letterSpacing: '0.25px',
    weight: 400
  },
  'headline-5': {
    size: '26px',
    letterSpacing: '0px',
    weight: 400
  },
  'headline-6': {
    size: '22px',
    letterSpacing: '0.15px',
    weight: 500
  },
  'subTitle-1': {
    size: '17px',
    letterSpacing: '0.15px',
    weight: 400
  },
  'subTitle-2': {
    size: '15px',
    letterSpacing: '0.1px',
    weight: 500
  },
  'body-1': {
    size: '17px',
    letterSpacing: '0.5px',
    weight: 400
  },
  'body-2': {
    size: '15px',
    letterSpacing: '0.25px',
    weight: 400
  },
  button: {
    size: '15px',
    letterSpacing: '1.25px',
    weight: 500
  },
  caption: {
    size: '13px',
    letterSpacing: '0.4px',
    weight: 400
  },
  overline: {
    size: '11px',
    letterSpacing: '1.5px',
    weight: 400
  }
}

export const Text = styled.p<TextProps>(props => `
  font-size: ${defaultTypeScale[props.type ?? 'headline-1'].size};
  font-weight: ${defaultTypeScale[props.type ?? 'headline-1'].weight};
  letter-spacing: ${defaultTypeScale[props.type ?? 'headline-1'].letterSpacing};
  color: ${props.color ?? 'black'};
`)
