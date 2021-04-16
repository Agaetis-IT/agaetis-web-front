import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { registerRoute, setCatchHandler } from 'workbox-routing'
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

clientsClaim()

const WB_MANIFEST = self.__WB_MANIFEST
WB_MANIFEST.push(
  {
    url: '/offline.html',
    revision: null
  }
)
precacheAndRoute(WB_MANIFEST)

cleanupOutdatedCaches()
registerRoute(
  '/',
  new StaleWhileRevalidate({
    cacheName: 'start-url',
    plugins: [new ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 365 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-font-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /\.(?:js)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-js-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /\.(?:css|less)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-style-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /.*\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-image-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /\.(?:json|xml|csv)$/i,
  new NetworkFirst({
    cacheName: 'static-data-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /\/api\/.*$/i,
  new NetworkFirst({
    cacheName: 'apis',
    networkTimeoutSeconds: 10,
    plugins: [new ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(/(.*wp-json\/wp\/v2\/posts.*)|(.*agaetis\.fr\/blog)|(.*wp-json\/agaetis\/api\/v1\/categories.*)/i,
  new NetworkFirst({
    cacheName: 'blog',
    networkTimeoutSeconds: 10,
    plugins: [new ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /.*/i,
  new StaleWhileRevalidate({
    cacheName: 'others',
    networkTimeoutSeconds: 10,
    plugins: [new ExpirationPlugin({ maxEntries: 128, maxAgeSeconds: 30 * 24 * 3600, purgeOnQuotaError: !0 })]
  }),
  'GET'
)

setCatchHandler(({event}) => {
  switch (event.request.destination) {
    case 'document':
      return matchPrecache('/offline.html');
    default: 
      return Response.error()
  }
})

self.addEventListener('message', async event => {
  if (event.data && event.data.action === 'CACHE_NEW_ROUTE') {
    caches.open('others').then(cache =>
      cache.match(event.source.url).then(res => {
        if (res === undefined) {
          return cache.add(event.source.url)
        }
      })
    )
  } else if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})