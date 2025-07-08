import { useEffect } from 'react'
import seoConfig from '../seoConfig.json'

export function useSEO(routeKey) {
  useEffect(() => {
    const config = seoConfig[routeKey] || seoConfig['/']
    if (config?.title) document.title = config.title
    if (config?.description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = config.description
    }
  }, [routeKey])
}
