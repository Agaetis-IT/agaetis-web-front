import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ServiceWorkerManager = () => {

    const [isOnline, setIsOnline] = useState(true)
    const router = useRouter()

    useEffect(() => {
      if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
        setIsOnline(window.navigator.onLine)
        if (!window.ononline) {
          window.addEventListener('online', () => {
            setIsOnline(true)
          })
        }
        if (!window.onoffline) {
          window.addEventListener('offline', () => {
            setIsOnline(false)
          })
        }
      }

      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
        const wb = window.workbox
        const promptNewVersionAvailable = () => {
          if (confirm('Une nouvelle version de ce site est disponible, recharger la page ?')) {
            wb.messageSW({ action: 'SKIP_WAITING' })
            wb.addEventListener('controlling', () => {
              window.location.reload()
            })
          }
        }
        wb.addEventListener('waiting', promptNewVersionAvailable)
        wb.addEventListener('externalwaiting', promptNewVersionAvailable)
      }
    }, [])
  
    useEffect(() => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined && isOnline) {
        if (router.route !== '/') {
          window.workbox.active.then(_ => {
            window.workbox.messageSW({ action: 'CACHE_NEW_ROUTE' })
          })
        }
      }
    }, [isOnline, router.route])

    return null
}

export default ServiceWorkerManager