// components/ProgressBar.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export default function ProgressBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()
  }, [pathname])

  return null
}
