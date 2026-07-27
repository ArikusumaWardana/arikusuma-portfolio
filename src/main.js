import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './assets/index.css'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  { 
    routes
  },
  ({ app, router, routes, isClient, initialState }) => {
    if (isClient) {
      import('./utils/analytics').then(({ initAnalytics, trackPageView }) => {
        initAnalytics()
        router.afterEach((to) => {
          // Track page view after routing finishes
          trackPageView(to.fullPath)
        })
      })
    }
  }
)

