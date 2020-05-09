import * as React from 'react'
import { Text, HomeBackground } from '../components'

const TypingText: React.FC = () => {
  const text = [
    'JavaScript programmer.',
    'TypeScript programmer.',
    'Node.js programmer.',
    'Vue.js programmer',
    'React.js programmer.',
    'php programmer.',
    'member of Discord.js Japan User Group.'
  ]

  const [currentText, setCurrentText] = React.useState('')
  const [isFinish, setFinish] = React.useState(false)
  const [isWriting, setWriting] = React.useState(false)

  const waitTimeout = (handler: (...args: unknown[]) => void, timeout: number): Promise<void> => {
    return new Promise(resolve => setTimeout(() => resolve(handler()), timeout))
  }
  const getRandomText = React.useCallback(() => text[Math.floor(Math.random() * text.length)], [])
  const startTyping = React.useCallback(async () => {
    if (!isFinish) {
      setWriting(true)
      const inputText = [...getRandomText()]
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      await Promise.all(inputText.map((text, index) => waitTimeout(() => setCurrentText(current => current + text), 75 * index + 1)))
        .then(() => setFinish(true))
    }
  }, [isFinish])

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
  }, [isFinish, isWriting])

  return (
    <Text color='white' as='h1' type='headline-6'>InkoHX is { currentText }</Text>
  )
}

const IndexPage: React.FC = () => {
  return (
    <HomeBackground>
      <TypingText />
    </HomeBackground>
  )
}

export default IndexPage
