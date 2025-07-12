import { useState, useEffect } from 'react'

const AUTO_PREVIEW_KEY = 'ui-works-auto-preview'

export function useAutoPreview() {
  const [autoPreview, setAutoPreview] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
     try {
      const saved = localStorage.getItem('autoPreview');
      const parsed = JSON.parse(saved ?? 'false');
      setAutoPreview(typeof parsed === 'boolean' ? parsed : false);
    } catch (e) {
      console.warn('Failed to load autoPreview from localStorage:', e);
      setAutoPreview(false);
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
