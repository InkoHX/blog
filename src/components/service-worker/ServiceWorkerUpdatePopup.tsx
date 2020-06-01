import { IconButton, Snackbar } from '@material-ui/core'
import { Replay } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import * as React from 'react'

export const ServiceWorkerUpdatePopup: React.FC = () => {
  const [isUpdate, setUpdate] = React.useState(false)

  React.useEffect(() => {
    const workbox = window?.workbox

    if (!workbox) return
    if (!('serviceWorker' in navigator)) return

    const waitingHandler = (): void => setUpdate(true)
    const controllingHandler = (): void => window.location.reload()

    workbox.addEventListener('waiting', waitingHandler)
    workbox.addEventListener('controlling', controllingHandler)

    workbox.register()
      .catch(console.error)

    return () => {
      workbox.removeEventListener('waiting', waitingHandler)
      workbox.removeEventListener('controlling', controllingHandler)
    }
  }, [])

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={isUpdate}
      autoHideDuration={15000}
      onClose={() => setUpdate(false)}
    >
      <Alert
        severity='success'
        action={
          <IconButton
            aria-label='更新'
            onClick={() => window.workbox?.messageSW({ type: 'SKIP_WAITING' })}
          >
            <Replay />
          </IconButton>
        }
      >
        <AlertTitle>更新準備完了</AlertTitle>
        サイトのコンテンツを更新する準備が完了しました！今すぐ更新しますか？
      </Alert>
    </Snackbar>
  )
}
