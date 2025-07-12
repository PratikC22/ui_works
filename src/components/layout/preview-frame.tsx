import { useState, useEffect, useRef } from 'react'

const PreviewFrame = ({
  html,
  css,
  js,
  autoPreview = false,
  previewKey = 0,
}: {
  html: string
  css: string
  js: string
  autoPreview?: boolean
  previewKey?: number
}) => {
  const [previewHtml, setPreviewHtml] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const compileCode = async () => {
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html, css, js }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Compilation failed')
      }

      setPreviewHtml(data.html)
    } catch (err) {
      console.error('Compilation error:', err)
      setPreviewHtml(`
        <!DOCTYPE html>
        <html>
        <head><title>Error</title></head>
        <body>
          <p style="color:red;font-family:monospace;padding:16px;">
            ${err instanceof Error ? err.message : 'Unknown error occurred'}
          </p>
        </body>
        </html>
      `)
    }
  }

  // Debounced auto-compilation
  useEffect(() => {
    if (autoPreview) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (html || css || js) {
          compileCode()
        }
      }, 1200)

      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js, autoPreview])

  // Manual compilation trigger (when previewKey changes)
  useEffect(() => {
    if (!autoPreview && (html || css || js)) {
      console.log(
        'Manual compilation triggered by previewKey change:',
        previewKey
      )
      compileCode()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewKey])

  return (
    <div className='w-full h-full flex flex-col'>
      <iframe
        ref={iframeRef}
        srcDoc={previewHtml}
        title='Code Preview'
        sandbox='allow-scripts allow-same-origin'
        className='w-full flex-1 border-none bg-white dark:bg-gray-900'
      />
    </div>
  )
}

export default PreviewFrame
