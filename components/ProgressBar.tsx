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
    const timeout = setTimeout(() => {
      NProgress.done()
    }, 300) // Adjust this based on how fast your pages load

    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
