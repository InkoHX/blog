import * as React from 'react'

export const AnalyticsScript: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') return null
  if (!process.env.GA_TRACKING_ID) return null

  return (
    <React.Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`} />
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_TRACKING_ID}');`
      }} />
    </React.Fragment>
  )
}
