import { seoConfig } from '../config/seo'

/**
 * Initializes Google Analytics (GA4) dynamically on the client side.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || !seoConfig.googleAnalyticsId) return

  // Prevent multiple injections
  if (document.getElementById('google-analytics-gtag')) return

  // Inject gtag.js script
  const script = document.createElement('script')
  script.id = 'google-analytics-gtag'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${seoConfig.googleAnalyticsId}`
  document.head.appendChild(script)

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }

  // Configure GA4
  window.gtag('js', new Date())
  window.gtag('config', seoConfig.googleAnalyticsId, {
    send_page_view: false // We will handle page views manually via vue-router for accurate routing logs
  })
}

/**
 * Logs a page view event to GA4.
 * @param {string} path - The path of the page viewed.
 */
export function trackPageView(path) {
  if (typeof window !== 'undefined' && window.gtag && seoConfig.googleAnalyticsId) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title
    })
  }
}
