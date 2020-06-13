import * as React from 'react'
import { NextRouter } from 'next/router'

export const INTERNAL_LINK_PATTERN = /^(?:http(?:s)?:\/\/)?(?:.+\.)?(?:(?:inkohx)\.(?:dev|now\.sh)|localhost:.{1,5})\/(?<type>(tags|posts))\/(?<id>.+)$/su

export const internalLinkClickHandler = (event: React.MouseEvent<HTMLElement>, router: NextRouter): Promise<boolean> | undefined => {
  const elements = event.currentTarget.getElementsByTagName('a')
  const target = event.target

  for (const element of elements) {
    if (element !== target) continue

    const result = INTERNAL_LINK_PATTERN.exec(element.href)?.groups
    if (!result) return

    event.preventDefault()

    return router.push(`/${result.type}/[id]`, `/${result.type}/${result.id}`)
  }
}
