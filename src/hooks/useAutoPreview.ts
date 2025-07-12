import { useState, useEffect } from 'react'

const AUTO_PREVIEW_KEY = 'ui-works-auto-preview'

export function useAutoPreview() {
  const [autoPreview, setAutoPreview] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTO_PREVIEW_KEY)
      if (saved !== null) {
        setAutoPreview(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load auto preview setting:', error)
    }
  }, [])

  // Save to localStorage whenever autoPreview changes
  const updateAutoPreview = (value: boolean) => {
    try {
      setAutoPreview(value)
      localStorage.setItem(AUTO_PREVIEW_KEY, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save auto preview setting:', error)
      // Still update state even if localStorage fails
      setAutoPreview(value)
    }
  }

  return {
    autoPreview,
    setAutoPreview: updateAutoPreview,
  }
}
