import * as React from 'react'

import { Card, Grid, HomeBackground, CardLogo, Text, Footer } from '../components'

const TypingText: React.FC = () => {
  const text = React.useMemo(() => [
    'JavaScript programmer.',
    'TypeScript programmer.',
    'Node.js programmer.',
    'Vue.js programmer.',
    'React.js programmer.',
    'php programmer.',
    'member of Discord.js Japan User Group.'
  ], [])

  const [currentText, setCurrentText] = React.useState('')
  const [isFinish, setFinish] = React.useState(false)
  const [isWriting, setWriting] = React.useState(false)

  const waitTimeout = (handler: (...args: unknown[]) => void, timeout: number): Promise<void> => {
    return new Promise(resolve => setTimeout(() => resolve(handler()), timeout))
  }
  const getRandomText = React.useCallback(() => text[Math.floor(Math.random() * text.length)], [text])
  const startTyping = React.useCallback(async () => {
    if (!isFinish) {
      setWriting(true)
      const inputText = [...getRandomText()]
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      await Promise.all(inputText.map((text, index) => waitTimeout(() => setCurrentText(current => current + text), 75 * index + 1)))

      setFinish(true)
    }
  }, [isFinish, getRandomText])

  React.useEffect(() => {
    if (isFinish) {
      setTimeout(() => {
        setCurrentText('')
        setFinish(false)
        setWriting(false)
      }, 1000)
    }

    if (!isFinish && !isWriting) {
      setTimeout(() => startTyping(), 500)
    }
  }, [isFinish, isWriting, startTyping])

  return (
    <Text color='white' as='h1' type='headline-6'>InkoHX is { currentText }</Text>
  )
}

interface Skill {
  name: string
  imagePath: string
}

const Skills: React.FC = () => {
  const skills = React.useMemo((): Skill[] => [
    {
      name: 'JavaScript',
      imagePath: '/javascript.svg'
    },
    {
      name: 'TypeScript',
      imagePath: '/typescript.svg'
    },
    {
      name: 'Node.js',
      imagePath: '/nodejs.svg'
    }
  ], [])
  const cards = skills.map(skill => {
    return (
      <Card width='350' height='200' key={skill.name}>
        <CardLogo src={skill.imagePath} alt={skill.name} width='130' height='130'></CardLogo>
        <Text as='p' type='body-1' align='center'>{skill.name}</Text>
      </Card>
    )
  })

  return (
    <React.Fragment>
      <Text
        as='h2'
        type='headline-4'
        align='center'
      >
        Skills
      </Text>
      <Grid>
        {cards}
      </Grid>
    </React.Fragment>
  )
}

const IndexPage: React.FC = () => {
  return (
    <React.Fragment>
      <HomeBackground>
        <TypingText />
      </HomeBackground>
      <Skills />
      <Footer>
        <Text as='p' type='subTitle-1'>MIT Licence | Copyright © 2020 InkoHX All rights reserved.</Text>
      </Footer>
    </React.Fragment>
  )
}

export default IndexPage
