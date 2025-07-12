import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  const { html, css, js, buildTool = 'none' } = await request.json()

  try {
    const tempId = randomUUID()
    const tempDir = path.join(process.cwd(), 'temp', tempId)
    await fs.mkdir(tempDir, { recursive: true })

    // Create package.json if build tool is specified
    if (buildTool !== 'none') {
      const packageJson = {
        name: `temp-project-${tempId}`,
        version: '1.0.0',
        scripts: {
          build: getBuildScript(buildTool),
          dev: getDevScript(buildTool),
        },
        dependencies: getDependencies(buildTool),
        devDependencies: getDevDependencies(buildTool),
      }

      await fs.writeFile(
        path.join(tempDir, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      )
    }

    // Write source files
    if (html) {
      await fs.writeFile(path.join(tempDir, 'index.html'), html)
    }
    if (css) {
      await fs.writeFile(path.join(tempDir, 'styles.css'), css)
    }
    if (js) {
      await fs.writeFile(path.join(tempDir, 'script.js'), js)
    }

    let result = ''

    if (buildTool === 'none') {
      // Simple concatenation like your original approach
      result = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Preview</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            margin: 0; 
            padding: 16px; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: white;
            color: #333;
        }
        ${css || ''}
    </style>
</head>
<body>
    ${html || ''}
    <script>
        (function() {
            try {
                ${js || ''}
            } catch (e) {
                console.error('JavaScript Error:', e);
                document.body.innerHTML += '<div style="color: red; background: #fee; padding: 10px; margin: 10px 0; border-radius: 4px; font-family: monospace; border: 1px solid #fcc;"><strong>JavaScript Error:</strong> ' + e.message + '</div>';
            }
        })();
    </script>
</body>
</html>`
    } else {
      // Run build process
      await execAsync('npm install', { cwd: tempDir, timeout: 30000 })
      await execAsync('npm run build', { cwd: tempDir, timeout: 30000 })

      // Read the built file
      const builtPath = path.join(tempDir, 'dist', 'index.html')
      result = await fs.readFile(builtPath, 'utf-8')
    }

    // Clean up
    await fs.rm(tempDir, { recursive: true, force: true })

    return NextResponse.json({
      success: true,
      html: result,
      id: tempId,
    })
  } catch (error) {
    console.error('Compilation error:', error)
    return NextResponse.json(
      {
        error: 'Compilation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

function getBuildScript(buildTool: string): string {
  switch (buildTool) {
    case 'vite':
      return 'vite build'
    case 'webpack':
      return 'webpack --mode production'
    case 'parcel':
      return 'parcel build index.html'
    default:
      return 'echo "No build script"'
  }
}

function getDevScript(buildTool: string): string {
  switch (buildTool) {
    case 'vite':
      return 'vite'
    case 'webpack':
      return 'webpack serve'
    case 'parcel':
      return 'parcel index.html'
    default:
      return 'echo "No dev script"'
  }
}

function getDependencies(buildTool: string): Record<string, string> {
  const base = {}

  switch (buildTool) {
    case 'vite':
      return { ...base }
    case 'webpack':
      return { ...base }
    case 'parcel':
      return { ...base }
    default:
      return base
  }
}

function getDevDependencies(buildTool: string): Record<string, string> {
  switch (buildTool) {
    case 'vite':
      return {
        vite: '^4.0.0',
        '@vitejs/plugin-react': '^4.0.0',
      }
    case 'webpack':
      return {
        webpack: '^5.0.0',
        'webpack-cli': '^5.0.0',
        'html-webpack-plugin': '^5.0.0',
        'css-loader': '^6.0.0',
        'style-loader': '^3.0.0',
      }
    case 'parcel':
      return {
        parcel: '^2.0.0',
      }
    default:
      return {}
  }
}
