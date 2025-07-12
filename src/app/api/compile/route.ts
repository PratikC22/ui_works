import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { html, css, js } = await request.json()

    const gifs = [
      '/errors/error1.gif',
      '/errors/error2.gif',
      '/errors/error3.gif',
      '/errors/error4.gif',
      '/errors/error5.gif',
      '/errors/error6.gif',
      '/errors/error7.gif',
      '/errors/error8.jpeg',
    ]
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)]

    const fullHtml = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Code Preview</title>
                <style>
                  ${css}

                  .js-error {
                    background: #fee;
                    border: 1px solid #fcc;
                    color: #c33;
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 4px;
                    font-family: monospace;
                    white-space: pre-wrap;
                    word-break: break-word;
                  }

                  .js-error::before {
                    content: "JavaScript Error: ";
                    font-weight: bold;
                  }

                  .error-gif {
                    max-width: 200px;
                    max-height: 150px;
                    border-radius: 8px;
                    margin-top: 20px;
                    display: block;
                    margin-inline: auto;
                  }
                </style>
              </head>
              <body>
                ${html}

                <div id="error-container"></div>

                <script>
                  (function () {
                    const errorContainer = document.getElementById('error-container')

                    const originalError = console.error
                    console.error = function (...args) {
                      originalError.apply(console, args)
                      const errorDiv = document.createElement('div')
                      errorDiv.className = 'js-error'
                      errorDiv.textContent = args.join(' ')
                      errorContainer.appendChild(errorDiv)
                    }

                    window.addEventListener('error', function (event) {
                      const errorDiv = document.createElement('div')
                      errorDiv.className = 'js-error'
                      errorDiv.textContent = \`\${event.error?.message || event.message} at \${event.filename}:\${event.lineno}:\${event.colno}\`
                      errorContainer.appendChild(errorDiv)

                      const img = document.createElement('img')
                      img.src = '${randomGif}'
                      img.className = 'error-gif'
                      errorContainer.appendChild(img)
                    })

                    window.addEventListener('unhandledrejection', function (event) {
                      const errorDiv = document.createElement('div')
                      errorDiv.className = 'js-error'
                      errorDiv.textContent = \`Unhandled Promise Rejection: \${event.reason}\`
                      errorContainer.appendChild(errorDiv)

                      const img = document.createElement('img')
                      img.src = '${randomGif}'
                      img.className = 'error-gif'
                      errorContainer.appendChild(img)
                    })

                    try {
                      ${js}
                    } catch (error) {


                      const img = document.createElement('img')
                      img.src = '${randomGif}'
                      img.className = 'error-gif'
                      errorContainer.appendChild(img)

                      console.error('JavaScript execution error:', error)
                    }
                  })()
                </script>
              </body>
            </html>`

    return NextResponse.json({ html: fullHtml })
  } catch (error) {
    console.error('Build error:', error)
    return NextResponse.json(
      {
        error: 'Build failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
