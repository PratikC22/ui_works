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
  const [unusedGifs, setUnusedGifs] = useState([
    '/errors/error1.gif',
    '/errors/error2.gif',
    '/errors/error3.gif',
    '/errors/error4.gif',
    '/errors/error5.gif',
    '/errors/error6.gif',
    '/errors/error7.gif',
    '/errors/error8.jpeg',
  ])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getRandomGif = () => {
    if (unusedGifs.length === 0) {
      const allGifs = [
        '/errors/error1.gif',
        '/errors/error2.gif',
        '/errors/error3.gif',
        '/errors/error4.gif',
        '/errors/error5.gif',
        '/errors/error6.gif',
        '/errors/error7.gif',
        '/errors/error8.jpeg',
      ]
      setUnusedGifs(allGifs.slice(1))
      return allGifs[0]
    }

    const randomIndex = Math.floor(Math.random() * unusedGifs.length)
    const selectedGif = unusedGifs[randomIndex]
    setUnusedGifs((prev) => prev.filter((_, index) => index !== randomIndex))
    return selectedGif
  }

  const compileCode = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html, css, js }),
      })

      const data = await response.json()

      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || 'Compilation failed')
      }

      setPreviewHtml(data.html)
    } catch (err) {
      console.error('Compilation error:', err)

      // Show error with random GIF directly in iframe
      const selectedGif = getRandomGif()
      const errorHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error</title>
            <style>
                body { 
                    margin: 0; 
                    padding: 16px; 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: white;
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                }
                .error-container {
                    text-align: center;
                    max-width: 500px;
                }
                .error-gif {
                    max-width: 200px;
                    max-height: 150px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .error-message {
                    color: #dc2626;
                    background: #fee2e2;
                    padding: 16px;
                    border-radius: 8px;
                    border: 1px solid #fca5a5;
                    font-family: monospace;
                }
            </style>
        </head>
        <body>
            <div class="error-container">
                <img src="${selectedGif}" alt="Error GIF" class="error-gif">
                <div class="error-message">
                    <strong>Compilation Error:</strong><br>
                    ${err instanceof Error ? err.message : 'Unknown error occurred'}
                </div>
            </div>
        </body>
        </html>
      `
      setPreviewHtml(errorHtml)
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-compile when code changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (html || css || js) {
        compileCode()
      }
    }, 500) // 500ms debounce

    return () => clearTimeout(timeoutId)
  }, [html, css, js])

  const handleIframeLoad = () => {
    console.log('Iframe loaded successfully')
    if (iframeRef.current) {
      try {
        const iframeDoc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow?.document
        if (iframeDoc) {
          console.log('Iframe document accessible:', !!iframeDoc)
        }
      } catch (e) {
        console.error('Cannot access iframe document due to CORS:', e)
      }
    }
  }

  if (isLoading) {
    return <div className='w-full h-full flex flex-col'>Loading...</div>
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <iframe
        ref={iframeRef}
        srcDoc={previewHtml}
        title='Code Preview'
        sandbox='allow-scripts allow-same-origin'
        className='w-full flex-1 border-none bg-white dark:bg-gray-900'
        onLoad={handleIframeLoad}
      />
    </div>
  )
}

export default PreviewFrame
