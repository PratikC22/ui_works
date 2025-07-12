import { useState, useEffect, useRef } from 'react'

const PreviewFrame = ({
  html,
  css,
  js,
}: {
  html: string
  css: string
  js: string
}) => {
  const [previewHtml, setPreviewHtml] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const compileCode = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (html || css || js) compileCode()
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [html, css, js])

  return (
    <div className='w-full h-full flex flex-col'>
      {isLoading ? (
        <div className='w-full h-full flex items-center justify-center'>
          Loading...
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          srcDoc={previewHtml}
          title='Code Preview'
          sandbox='allow-scripts allow-same-origin'
          className='w-full flex-1 border-none bg-white dark:bg-gray-900'
        />
      )}
    </div>
  )
}

export default PreviewFrame
