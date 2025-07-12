'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()

  // Don't show breadcrumb on homepage
  if (pathname === '/') {
    return null
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Add home breadcrumb
    breadcrumbs.push({ label: 'Home', href: '/' })

    // Build breadcrumbs from path segments
    let currentPath = ''
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Format the label (capitalize and replace hyphens/underscores with spaces)
      const label = segment
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      // Don't add href for the last segment (current page)
      const isLast = index === segments.length - 1
      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 py-2'>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className='flex items-center gap-1'
                      >
                        {index === 0 && <Home className='h-3 w-3' />}
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
