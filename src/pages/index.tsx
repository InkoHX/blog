import { Paper, Typography } from '@material-ui/core'
import * as React from 'react'

import { HomeBackground } from '../components'

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
    <Typography component='h1' variant='h4'>InkoHX is { currentText }</Typography>
  )
}

const IndexPage: React.FC = () => {
  return (
    <React.Fragment>
      <HomeBackground>
        <TypingText />
      </HomeBackground>
      <Paper style={{ margin: '300px 0' }} />
    </React.Fragment>
  )
}

export default IndexPage
