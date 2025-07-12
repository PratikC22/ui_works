'use client'

import React from 'react'
import { useChallengeStore } from '@/store/challenge-store'
import { ChallengeHeader } from '@/components/challenge/challenge-header'
import { useParams, usePathname } from 'next/navigation'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ChallengeAccordion } from '@/components/challenges/challenge-accordion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function ChallengeDetailPage() {
  const params = useParams()
  const pathname = usePathname()
  const { challenges } = useChallengeStore()
  const challengeId = Array.isArray(params.id) ? params.id[0] : params.id

  const challenge = challenges.find((c) => c.id === challengeId)
  const isWorkspaceRoute = pathname.includes('/workspace')

  if (!challenge) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-2xl font-bold'>Challenge not found</h1>
        <p className='text-muted-foreground'>
          This challenge could not be found. Please check the URL or go back to
          the challenges list.
        </p>
      </div>
    )
  }

  const createPreviewHtml = ({
    html,
    css,
    js,
    react,
  }: {
    html: string
    css: string
    js: string
    react?: React.ComponentType | null
  }) => {
    if (react) {
      if (typeof react === 'function') {
        const ReactComponent = react as React.ComponentType
        return <ReactComponent />
      }

      return react
    }

    return `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `
  }

  const solutionHtml = createPreviewHtml({
    html: challenge.solutionCode.html,
    css: challenge.solutionCode.css,
    js: challenge.solutionCode.javascript,
    react: challenge.solutionCode.react,
  })

  return (
    <div className='h-[calc(100vh-64px)] container mx-auto'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className='h-full overflow-y-auto p-6'>
            <ChallengeHeader challenge={challenge} />
            {!isWorkspaceRoute && (
              <div className='mb-6 flex gap-3'>
                <Link
                  href={`/challenges/${challenge.id}/workspace`}
                  className='w-fit'
                >
                  <Button className='cursor-pointer'>
                    <span>Start Challenge</span>
                    <ArrowRight className='h-4 w-4 ml-2' />
                  </Button>
                </Link>
              </div>
            )}
            <ChallengeAccordion challenge={challenge} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className='h-full w-full flex items-start justify-center p-4'>
            <div className='w-full h-full'>
              {typeof solutionHtml === 'string' ? (
                <iframe
                  srcDoc={solutionHtml}
                  title='Final Output Preview'
                  sandbox='allow-scripts'
                  className='w-full h-full border rounded-md'
                />
              ) : (
                <div
                  title='Final Output Preview'
                  className='w-full h-full border rounded-md'
                >
                  {solutionHtml}
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
