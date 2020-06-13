import * as React from 'react'

export const AdSenseScript: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') return null
  if (!process.env.GOOGLE_ADSENSE_ID) return null

  return (
    <script data-ad-client={process.env.GOOGLE_ADSENSE_ID} async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
  )
}
