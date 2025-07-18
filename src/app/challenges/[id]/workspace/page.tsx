'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import JSZip from 'jszip'
import { useAutoPreview } from '@/hooks/useAutoPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Play, RotateCcw, Save, Download, Code, BookOpen } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import dynamic from 'next/dynamic'
import PreviewFrame from '@/components/layout/preview-frame'

const ChallengeDetailPage = dynamic(() => import('./../page'), { ssr: false })

// localStorage utilities
const getStorageKey = (challengeId: string) => `workspace-code-${challengeId}`

const saveToStorage = (
  challengeId: string,
  code: { html: string; css: string; js: string }
) => {
  try {
    const key = getStorageKey(challengeId)
    localStorage.setItem(key, JSON.stringify(code))
    return true
  } catch (error) {
    console.error('Save failed:', error)
    return false
  }
}

const loadFromStorage = (challengeId: string) => {
  try {
    const key = getStorageKey(challengeId)
    const saved = localStorage.getItem(key)
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed
    }
  } catch (error) {
    console.error('Load failed:', error)
  }
  return null
}

const clearFromStorage = (challengeId: string) => {
  try {
    const key = getStorageKey(challengeId)
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Clear failed:', error)
    return false
  }
}

// Get all workspace keys for cleanup
const getAllWorkspaceKeys = () => {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('workspace-code-')) {
      keys.push(key)
    }
  }
  return keys
}

// Clean up old workspace data (keep only last 10 challenges)
const cleanupOldWorkspaces = () => {
  try {
    const workspaceKeys = getAllWorkspaceKeys()
    if (workspaceKeys.length > 10) {
      // Sort by last modified time (if available) or just remove oldest
      const keysToRemove = workspaceKeys.slice(0, workspaceKeys.length - 10)
      keysToRemove.forEach((key) => localStorage.removeItem(key))
    }
  } catch (error) {
    console.error('Cleanup failed:', error)
  }
}

// Clear all workspace data
const clearAllWorkspaces = () => {
  try {
    const workspaceKeys = getAllWorkspaceKeys()
    workspaceKeys.forEach((key) => localStorage.removeItem(key))
    return workspaceKeys.length
  } catch (error) {
    console.error('Clear all failed:', error)
    return 0
  }
}

const CodeEditor = ({
  value,
  onChange,
  language,
  placeholder = '',
}: {
  value: string
  onChange: (value: string) => void
  language: string
  placeholder?: string
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  console.log(language)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const value = e.currentTarget.value
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  return (
    <div className='relative h-full'>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='w-full h-full p-4 font-mono text-sm bg-background border-none outline-none resize-none text-foreground'
        style={{
          fontFamily: 'Consolas, "Courier New", monospace',
          lineHeight: '1.5',
          tabSize: 2,
        }}
        spellCheck={false}
      />
    </div>
  )
}

export default function Workspace() {
  const params = useParams<{ id: string }>()
  const challengeId = params?.id || 'default'

  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [activeTab, setActiveTab] = useState('html')
  const [previewKey, setPreviewKey] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'saved' | 'error'
  >('idle')
  const { autoPreview, setAutoPreview } = useAutoPreview()

  const initialCode = {
    html: '<h1>Hello World!</h1>\n<p>Start coding here...</p>',
    css: 'h1 {\n  color: #333;\n  text-align: center;\n}\n\np {\n  color: #666;\n  text-align: center;\n  margin-top: 20px;\n}',
    js: 'console.log("Hello from JavaScript!");',
  }

  const formatCode = (code: string, language: string): string => {
    if (language === 'html') {
      // Proper HTML formatting
      const formatted = code
        .replace(/>\s*</g, '>\n<') // Add line breaks between tags
        .replace(/\n\s*\n/g, '\n') // Remove multiple empty lines
        .trim()

      let indentLevel = 0
      const lines = formatted.split('\n')
      const formattedLines = lines.map((line) => {
        const trimmed = line.trim()
        if (!trimmed) return ''

        // Decrease indent for closing tags
        if (trimmed.startsWith('</')) {
          indentLevel = Math.max(0, indentLevel - 1)
        }

        const result = '  '.repeat(indentLevel) + trimmed

        // Increase indent for opening tags (but not self-closing)
        if (
          trimmed.startsWith('<') &&
          !trimmed.startsWith('</') &&
          !trimmed.endsWith('/>')
        ) {
          indentLevel++
        }

        return result
      })

      return formattedLines.filter((line) => line !== '').join('\n')
    } else if (language === 'css') {
      // Proper CSS formatting
      const formatted = code
        .replace(/\s*\{\s*/g, ' {\n  ') // Format opening braces
        .replace(/\s*;\s*/g, ';\n  ') // Format semicolons
        .replace(/\s*\}\s*/g, '\n}\n') // Format closing braces
        .replace(/\n\s*\n/g, '\n') // Remove multiple empty lines
        .trim()

      return formatted
    } else if (language === 'javascript') {
      // Proper JavaScript formatting
      const formatted = code
        .replace(/\s*\{\s*/g, ' {\n  ') // Format opening braces
        .replace(/\s*;\s*/g, ';\n') // Format semicolons
        .replace(/\s*\}\s*/g, '\n}\n') // Format closing braces
        .replace(/\n\s*\n/g, '\n') // Remove multiple empty lines
        .trim()

      return formatted
    }
    return code
  }

  const handleFormat = () => {
    setHtml(formatCode(html, 'html'))
    setCss(formatCode(css, 'css'))
    setJs(formatCode(js, 'javascript'))
  }

  const handleRun = () => {
    setPreviewKey((prev) => prev + 1)
  }

  const handleReset = () => {
    setHtml(initialCode.html)
    setCss(initialCode.css)
    setJs(initialCode.js)
    setPreviewKey(0)
    // Clear localStorage
    clearFromStorage(challengeId)
  }

  const handleSave = () => {
    setSaveStatus('saving')
    const code = { html, css, js }
    const success = saveToStorage(challengeId, code)
    setSaveStatus(success ? 'saved' : 'error')

    // Reset status after 2 seconds
    setTimeout(() => setSaveStatus('idle'), 2000)

    // Trigger preview when auto-preview is off
    if (!autoPreview) {
      setPreviewKey((prev) => prev + 1)
    }
  }

  const handleClearAll = () => {
    clearAllWorkspaces()
    handleReset()
  }

  const handleDownload = async () => {
    try {
      // Create the HTML file content
      const htmlContent = `
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Code Challenge</title>
                  <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                  ${html}
                  <script src="script.js"></script>
                </body>
              </html>
              `

      // Create a zip file using JSZip (we'll use a simple approach)
      const zip = new JSZip()

      // Add files to zip
      zip.file('index.html', htmlContent)
      zip.file('styles.css', css)
      zip.file('script.js', js)

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' })

      // Create download link
      const url = URL.createObjectURL(zipBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `challenge-${challengeId}-${new Date().toISOString().split('T')[0]}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback: download files individually
      downloadIndividualFiles()
    }
  }

  const downloadIndividualFiles = () => {
    // Fallback method - download files individually
    const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Code Challenge</title>
                <link rel="stylesheet" href="styles.css">
              </head>
              <body>
                ${html}
                <script src="script.js"></script>
              </body>
            </html>
            `

    // Download HTML
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' })
    const htmlUrl = URL.createObjectURL(htmlBlob)
    const htmlLink = document.createElement('a')
    htmlLink.href = htmlUrl
    htmlLink.download = 'index.html'
    htmlLink.click()
    URL.revokeObjectURL(htmlUrl)

    // Download CSS
    const cssBlob = new Blob([css], { type: 'text/css' })
    const cssUrl = URL.createObjectURL(cssBlob)
    const cssLink = document.createElement('a')
    cssLink.href = cssUrl
    cssLink.download = 'styles.css'
    cssLink.click()
    URL.revokeObjectURL(cssUrl)

    // Download JS
    const jsBlob = new Blob([js], { type: 'text/javascript' })
    const jsUrl = URL.createObjectURL(jsBlob)
    const jsLink = document.createElement('a')
    jsLink.href = jsUrl
    jsLink.download = 'script.js'
    jsLink.click()
    URL.revokeObjectURL(jsUrl)
  }

  // Save to localStorage whenever code changes
  useEffect(() => {
    if (isLoaded) {
      const code = { html, css, js }
      const success = saveToStorage(challengeId, code)
      if (!success) {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 2000)
      }
    }
  }, [html, css, js, challengeId, isLoaded])

  // Load code from URL or localStorage on mount
  useEffect(() => {
    const startTime = Date.now()
    const minLoadingTime = 1000 // 3 seconds minimum

    const loadCode = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const codeParam = urlParams.get('code')

      if (codeParam) {
        try {
          const decoded = JSON.parse(atob(codeParam))
          setHtml(decoded.html || initialCode.html)
          setCss(decoded.css || initialCode.css)
          setJs(decoded.js || initialCode.js)
        } catch (e) {
          console.error('Failed to decode shared code:', e)
          // Fall back to saved/default code
          loadSavedOrDefaultCode()
        }
      } else {
        loadSavedOrDefaultCode()
      }

      // Ensure minimum loading time
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minLoadingTime - elapsed)

      setTimeout(() => {
        setIsLoaded(true)
      }, remainingTime)
    }

    const loadSavedOrDefaultCode = () => {
      const savedCode = loadFromStorage(challengeId)
      if (savedCode) {
        setHtml(savedCode.html || initialCode.html)
        setCss(savedCode.css || initialCode.css)
        setJs(savedCode.js || initialCode.js)
      } else {
        // No saved code, use initial values
        setHtml(initialCode.html)
        setCss(initialCode.css)
        setJs(initialCode.js)
      }
    }

    loadCode()
  }, [challengeId, initialCode.html, initialCode.css, initialCode.js])

  // Cleanup old workspace data on app load
  useEffect(() => {
    cleanupOldWorkspaces()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl + S (Windows/Linux) OR Cmd + S (Mac)
      if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault() // Prevent browser save dialog
        handleSave() // Call existing save function
      }

      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        handleRun()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Auto preview logic - now handled in PreviewFrame component
  // Removed to prevent double compilation

  // Show loading state until code is loaded
  if (!isLoaded) {
    return (
      <div className='h-[calc(100vh-64px)] container mx-auto flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='h-[calc(100vh-64px)] container mx-auto flex flex-col'>
      {/* Header */}
      <div className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex items-center justify-between py-3'>
          <div className='flex items-center gap-3'>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex items-center gap-2'
                >
                  <BookOpen className='h-4 w-4' />
                  Rules & Preview
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='p-0 !w-[95vw]'>
                <SheetHeader>
                  <SheetTitle className='sr-only'>
                    Challenge Rules & Preview
                  </SheetTitle>
                </SheetHeader>
                <div className='h-full w-full overflow-y-auto'>
                  <ChallengeDetailPage />
                </div>
              </SheetContent>
            </Sheet>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={handleFormat}
                className='flex items-center gap-2'
              >
                <Code className='h-4 w-4' />
                Format
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={handleRun}
                className='flex items-center gap-2'
              >
                <Play className='h-4 w-4' />
                Run
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center gap-2'
                  >
                    <RotateCcw className='h-4 w-4' />
                    Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Workspace</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset your code to the initial state and clear
                      any saved progress for this challenge. This action cannot
                      be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>
                      Reset Workspace
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <Switch
                id='auto-preview'
                checked={autoPreview}
                onCheckedChange={setAutoPreview}
              />
              <Label htmlFor='auto-preview'>Auto Preview</Label>
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={handleSave}
              className='flex items-center gap-2'
              disabled={saveStatus === 'saving'}
            >
              <Save className='h-4 w-4' />
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'saved'
                  ? 'Saved!'
                  : saveStatus === 'error'
                    ? 'Error'
                    : 'Save'}
            </Button>

            <Button
              variant='outline'
              size='sm'
              onClick={handleDownload}
              className='flex items-center gap-2'
            >
              <Download className='h-4 w-4' />
              Download
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex items-center gap-2'
                >
                  <RotateCcw className='h-4 w-4' />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear All Workspaces</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all saved code from all
                    challenges, Including the current workspace. This action
                    cannot be undone and will affect all your workspaces.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll}>
                    Clear All Workspaces
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-hidden'>
        <ResizablePanelGroup direction='horizontal'>
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className='h-full flex flex-col'>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className='flex-1 flex flex-col'
              >
                <TabsList className='grid w-full grid-cols-3 rounded-none border-b'>
                  <TabsTrigger value='html'>HTML</TabsTrigger>
                  <TabsTrigger value='css'>CSS</TabsTrigger>
                  <TabsTrigger value='js'>JS</TabsTrigger>
                </TabsList>

                <TabsContent value='html' className='flex-1 mt-0'>
                  <CodeEditor
                    value={html}
                    onChange={setHtml}
                    language='html'
                    placeholder='Enter your HTML here...'
                  />
                </TabsContent>

                <TabsContent value='css' className='flex-1 mt-0'>
                  <CodeEditor
                    value={css}
                    onChange={setCss}
                    language='css'
                    placeholder='Enter your CSS here...'
                  />
                </TabsContent>

                <TabsContent value='js' className='flex-1 mt-0'>
                  <CodeEditor
                    value={js}
                    onChange={setJs}
                    language='javascript'
                    placeholder='Enter your JavaScript here...'
                  />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className='h-full flex flex-col'>
              <div className='border-b px-4 py-2 bg-muted/50'>
                <h2 className='text-sm font-medium'>Preview</h2>
              </div>
              <div className='flex-1'>
                <PreviewFrame
                  key={previewKey}
                  html={html}
                  css={css}
                  js={js}
                  autoPreview={autoPreview}
                  previewKey={previewKey}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
