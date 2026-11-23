import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './assets/index.css'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      if (to.hash) {
        return { el: to.hash, behavior: 'smooth' }
      }
      if (to.meta?.section && to.meta.section !== 'hero') {
        return { el: `#${to.meta.section}`, behavior: 'smooth' }
      }
      return { top: 0, behavior: 'smooth' }
    }
  },
  ({ router, isClient }) => {
    if (isClient) {
      import('./utils/analytics').then(({ initAnalytics, trackPageView }) => {
        initAnalytics()
        router.afterEach((to) => {
          trackPageView(to.fullPath)
        })
      })
    }
  }
)
