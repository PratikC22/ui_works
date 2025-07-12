'use client'

import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { useLocalStorage } from '@/hooks/useClientStorage'

const ANNOUNCEMENT_KEY = 'announcement-dismissed-v1'

export function AnnouncementBanner() {
  const {
    value: isDismissed,
    setValue,
    isLoading,
  } = useLocalStorage<boolean>({
    key: ANNOUNCEMENT_KEY,
    defaultValue: false,
  })

  if (isLoading || isDismissed) return null

  const dismiss = () => {
    setValue({ value: true })
  }

  return (
    <div className='relative z-50 bg-accent-foreground'>
      <div className='container mx-auto px-4 h-12 flex items-center justify-between'>
        <p className='text-sm font-medium text-accent'>
          🎉 New Feature: Write, edit, and run code inside challenges.
          <Link href='/challenges' className='ml-1'>
            Start coding now →
          </Link>
        </p>
        <button
          onClick={dismiss}
          className='ml-4 inline-flex items-center justify-center rounded-md p-1 transition text-accent'
          aria-label='Dismiss announcement'
        >
          <XIcon className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}
